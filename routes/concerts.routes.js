const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.concerts);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const concert = db.concerts.find(item => item.id == id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ message: 'Not found...' });
  };
});

router.post('/', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ message: 'Missing required fields: performer, genre, price, day, image' });
  };
  const newConcert = { id: uuidv4(), performer, genre, price, day, image };
  db.concerts.push(newConcert);
  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ message: 'Missing required fields: performer, genre, price, day, image' });
  };
  const concert = db.concerts.find(item => item.id == id);
  if (concert) {
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
  };
  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = db.concerts.findIndex(item => item.id == id);
  if (index !== -1) {
    db.concerts.splice(index, 1);
  };
  res.json({ message: 'OK' });
});

module.exports = router;
