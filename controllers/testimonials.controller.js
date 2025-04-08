const Testimonial = require('../models/testimonial.model');

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).send({ message: 'Not found...' });
    res.json(testimonial);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const newTestimonial = new Testimonial(req.body);
    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).send({ message: 'Not found...' });
    testimonial.author = req.body.author;
    testimonial.text = req.body.text;
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) return res.status(404).send({ message: 'Not found...' });
    res.json({ message: 'OK' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
