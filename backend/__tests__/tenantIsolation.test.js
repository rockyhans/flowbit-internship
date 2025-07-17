const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Ticket = require('../models/Ticket');
const ticketRoutes = require('../routes/ticket');
const { verifyJWT } = require('../middleware/auth');

const app = express();
app.use(express.json());
app.use('/api/tickets', verifyJWT, ticketRoutes);

const JWT_SECRET = 'supersecretkey'; // same as in your app

describe('Tenant Isolation Test', () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/flowbit_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Ticket.deleteMany();

    // Insert 1 ticket for LogisticsCo
    await Ticket.create({
      title: 'Ticket A',
      status: 'Open',
      customerId: 'LogisticsCo',
      createdBy: 'admin1'
    });

    // Insert 1 ticket for RetailGmbH
    await Ticket.create({
      title: 'Ticket B',
      status: 'Open',
      customerId: 'RetailGmbH',
      createdBy: 'admin2'
    });

    server = app.listen(9000);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  it('should return only LogisticsCo tickets for LogisticsCo admin', async () => {
    const token = jwt.sign({
      userId: 'admin1',
      customerId: 'LogisticsCo',
      role: 'Admin'
    }, JWT_SECRET);

    const res = await request(app)
      .get('/api/tickets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].customerId).toBe('LogisticsCo');
  });

  it('should return only RetailGmbH tickets for RetailGmbH admin', async () => {
    const token = jwt.sign({
      userId: 'admin2',
      customerId: 'RetailGmbH',
      role: 'Admin'
    }, JWT_SECRET);

    const res = await request(app)
      .get('/api/tickets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.body).toHaveLength(1);
    expect(res.body[0].customerId).toBe('RetailGmbH');
  });
});
