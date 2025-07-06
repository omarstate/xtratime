const express = require('express');
const { Match } = require('../models/match');
const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
  const matches = await Match.find();
  res.send(matches);
});

// Get a match by ID
router.get('/:id', async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).send('Match not found.');
  res.send(match);
});

// Create a new match
router.post('/', async (req, res) => {
  const match = new Match(req.body);
  await match.save();
  res.send(match);
});

// Update a match
router.put('/:id', async (req, res) => {
  const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!match) return res.status(404).send('Match not found.');
  res.send(match);
});

// Delete a match
router.delete('/:id', async (req, res) => {
  const match = await Match.findByIdAndDelete(req.params.id);
  if (!match) return res.status(404).send('Match not found.');
  res.send(match);
});

module.exports = router; 