const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  res.json(db.testimonials);
});

router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const testimonial = db.testimonials.find(item => item.id == id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ message: 'Not found...' });
  };
});

router.post('/', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ message: 'Missing required fields: author and text' });
  };
  const newTestimonial = { id: uuidv4(), author, text };
  db.testimonials.push(newTestimonial);
  res.json({ message: 'OK' });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(400).json({ message: 'Missing required fields: author and text' });
  };
  const testimonial = db.testimonials.find(item => item.id == id);
  if (testimonial) {
    testimonial.author = author;
    testimonial.text = text;
  };
  res.json({ message: 'OK' });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = db.testimonials.findIndex(item => item.id == id);
  if (index !== -1) {
    db.testimonials.splice(index, 1);
  };
  res.json({ message: 'OK' });
});

module.exports = router;
