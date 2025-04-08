const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
