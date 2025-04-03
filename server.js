const express = require('express');
const cors = require('cors');
const path = require('path');
const socketIo = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const db = require('./db');

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE'
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New socket!');
  socket.emit('seatsUpdated', db.seats);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

let dbSeats = db.seats;

app.get('/api/seats', (req, res) => {
  res.json(dbSeats);
});

app.post('/api/seats', (req, res) => {
  const newSeat = req.body;
  dbSeats.push(newSeat);
  req.io.emit('seatsUpdated', dbSeats);
  res.status(200).json({ message: 'Seat added', seat: newSeat });
});

app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/concerts', concertsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});
