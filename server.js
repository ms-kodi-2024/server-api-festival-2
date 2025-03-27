const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const app = express();

app.use(cors({
  methods: 'GET,POST,PUT,DELETE'
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = db.find(item => item.id == id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  res.json(db[randomIndex]);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const newTestimonial = { id: uuidv4(), author, text };
  db.push(newTestimonial);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  const testimonial = db.find(item => item.id == id);
  if (testimonial) {
    testimonial.author = author;
    testimonial.text = text;
  }
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const id = req.params.id;
  const index = db.findIndex(item => item.id == id);
  if (index !== -1) {
    db.splice(index, 1);
  }
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
	console.log(`Server is running on port: 8000`);
})