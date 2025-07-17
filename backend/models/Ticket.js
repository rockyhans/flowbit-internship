const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: String,
  status: String,
  customerId: String,
  createdBy: String,
});

module.exports = mongoose.model('Ticket', ticketSchema);
