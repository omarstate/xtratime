const express = require('express');
const { Standing } = require('../models/standing');
const router = express.Router();

// Get all standings
router.get('/', async (req, res) => {
  const standings = await Standing.find();
  res.send(standings);
});

// Get standings for a league
router.get('/league/:league', async (req, res) => {
  const standings = await Standing.find({ league: req.params.league });
  res.send(standings);
});

// Create a new standing
router.post('/', async (req, res) => {
  const standing = new Standing(req.body);
  await standing.save();
  res.send(standing);
});

// Update a standing
router.put('/:id', async (req, res) => {
  const standing = await Standing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!standing) return res.status(404).send('Standing not found.');
  res.send(standing);
});

// Delete a standing
router.delete('/:id', async (req, res) => {
  const standing = await Standing.findByIdAndDelete(req.params.id);
  if (!standing) return res.status(404).send('Standing not found.');
  res.send(standing);
});

module.exports = router; 