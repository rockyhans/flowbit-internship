const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();
const axios = require('axios');
try {
  await axios.post('http://localhost:5678/webhook/new-ticket', {
    ticketId: newTicket._id,
    customerId,
    secret: process.env.N8N_SECRET || 'topsecret',
  });
} catch (err) {
  console.error('Failed to notify n8n', err.message);
}

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { customerId } = req.user;

  const ticket = await Ticket.findOne({ _id: id, customerId });
  if (!ticket) return res.status(404).json({ message: 'Not found' });

  return res.json(ticket);
});



router.post('/', async (req, res) => {
  const { title } = req.body;
  const ticket = await Ticket.create({
    title,
    status: 'Open',
    customerId: req.user.customerId,
    createdBy: req.user.userId,
  });

  // trigger n8n webhook here
  await fetch(process.env.N8N_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticketId: ticket._id, customerId: ticket.customerId })
  });

  res.json(ticket);
});

router.get('/', async (req, res) => {
  const tickets = await Ticket.find({ customerId: req.user.customerId });
  res.json(tickets);
});

module.exports = router;
