const Seat = require('../models/seat.model');
const pusher = require('../pusher');

const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) return res.status(404).send({ message: 'Not found...' });
    res.json(seat);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    if (!day || !seat || !client || !email) {
      return res.status(400).send({ message: 'Missing required fields: day, seat, client, email' });
    }
    const existing = await Seat.findOne({ day, seat });
    if (existing) {
      return res.status(409).send({ message: "The slot is already taken..." });
    }
    const newSeat = new Seat(req.body);
    const savedSeat = await newSeat.save();
    const allSeats = await Seat.find();
    pusher.trigger('seats-channel', 'seats-updated', allSeats);
    res.status(201).json(savedSeat);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateSeat = async (req, res) => {
  try {
    const { day, seat: seatNumber, client, email } = req.body;
    if (!day || !seatNumber || !client || !email) {
      return res.status(400).send({ message: 'Missing required fields: day, seat, client, email' });
    }
    const updatedSeat = await Seat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { day, seat: seatNumber, client, email } },
      { new: true }
    );
    if (!updatedSeat) return res.status(404).send({ message: 'Not found...' });
    const allSeats = await Seat.find();
    pusher.trigger('seats-channel', 'seats-updated', allSeats);
    res.json(updatedSeat);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
    if (!deletedSeat) return res.status(404).send({ message: 'Not found...' });
    const allSeats = await Seat.find();
    pusher.trigger('seats-channel', 'seats-updated', allSeats);
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllSeats, getSeatById, createSeat, updateSeat, deleteSeat };
