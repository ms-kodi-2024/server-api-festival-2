const Concert = require('../models/concert.model');

const getAllConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).send({ message: 'Not found...' });
    res.json(concert);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createConcert = async (req, res) => {
  try {
    const newConcert = new Concert(req.body);
    const savedConcert = await newConcert.save();
    res.status(201).json(savedConcert);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).send({ message: 'Not found...' });
    concert.performer = req.body.performer;
    concert.genre = req.body.genre;
    concert.price = req.body.price;
    concert.day = req.body.day;
    concert.image = req.body.image;
    const updatedConcert = await concert.save();
    res.json(updatedConcert);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteConcert = async (req, res) => {
  try {
    const deletedConcert = await Concert.findByIdAndDelete(req.params.id);
    if (!deletedConcert) return res.status(404).send({ message: 'Not found...' });
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllConcerts, getConcertById, createConcert, updateConcert, deleteConcert };
