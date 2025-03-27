const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.seats);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const seat = db.seats.find(item => item.id == id);
  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ message: 'Not found...' });
  }
});

router.post('/', (req, res) => {
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'Missing required fields: day, seat, client, email' });
  }
  const newSeat = { id: uuidv4(), day, seat, client, email };
  db.seats.push(newSeat);
  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'Missing required fields: day, seat, client, email' });
  }
  const seatItem = db.seats.find(item => item.id == id);
  if (seatItem) {
    seatItem.day = day;
    seatItem.seat = seat;
    seatItem.client = client;
    seatItem.email = email;
  }
  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = db.seats.findIndex(item => item.id == id);
  if (index !== -1) {
    db.seats.splice(index, 1);
  }
  res.json({ message: 'OK' });
});

module.exports = router;
