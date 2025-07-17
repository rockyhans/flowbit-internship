const express = require('express');
const Ticket = require('../models/Ticket');
const router = express.Router();
const N8N_SECRET = process.env.N8N_SECRET || 'topsecret';

router.post('/ticket-done', async (req, res) => {
  const { ticketId, secret } = req.body;

  if (secret !== N8N_SECRET) {
    return res.status(401).json({ message: 'Unauthorized webhook' });
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.status = 'Completed';
  await ticket.save();

  return res.status(200).json({ message: 'Ticket marked as completed' });
});

router.post('/ticket-done', async (req, res) => {
  const secret = req.headers['x-secret'];
  if (secret !== process.env.WEBHOOK_SECRET) return res.status(401).send('Invalid secret');

  const { ticketId } = req.body;
  await Ticket.findByIdAndUpdate(ticketId, { status: 'Resolved' });
  res.send('Updated');
});

module.exports = router;
