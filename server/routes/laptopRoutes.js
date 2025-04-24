const express = require('express');
const router = express.Router();
const Laptop = require('../models/Laptop');

// Get all laptops
router.get('/', (req, res) => {
  Laptop.getAll((err, results) => {
    if (err) {
      console.error('Error fetching laptops:', err);
      return res.status(500).json({ success: false, message: 'Error fetching laptops' });
    }
    res.json({ success: true, data: results });
  });
});

// Get available laptops
router.get('/available', (req, res) => {
  Laptop.getAvailable((err, results) => {
    if (err) {
      console.error('Error fetching available laptops:', err);
      return res.status(500).json({ success: false, message: 'Error fetching available laptops' });
    }
    res.json({ success: true, data: results });
  });
});

// Get a specific laptop
router.get('/:id', (req, res) => {
  Laptop.getById(req.params.id, (err, results) => {
    if (err) {
      console.error('Error fetching laptop:', err);
      return res.status(500).json({ success: false, message: 'Error fetching laptop' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Laptop not found' });
    }
    res.json({ success: true, data: results[0] });
  });
});

// Create a new laptop
router.post('/', (req, res) => {
  // Generate a unique laptop ID
  const laptopId = `LAP${Date.now()}`;
  const newLaptop = {
    LaptopId: laptopId,
    ...req.body
  };

  Laptop.create(newLaptop, (err, result) => {
    if (err) {
      console.error('Error creating laptop:', err);
      return res.status(500).json({ success: false, message: 'Error creating laptop' });
    }
    res.status(201).json({ success: true, data: { LaptopId: laptopId, ...req.body } });
  });
});

// Update a laptop
router.put('/:id', (req, res) => {
  Laptop.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error('Error updating laptop:', err);
      return res.status(500).json({ success: false, message: 'Error updating laptop' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Laptop not found' });
    }
    res.json({ success: true, message: 'Laptop updated successfully' });
  });
});

// Delete a laptop
router.delete('/:id', (req, res) => {
  Laptop.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Error deleting laptop:', err);
      return res.status(500).json({ success: false, message: 'Error deleting laptop' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Laptop not found' });
    }
    res.json({ success: true, message: 'Laptop deleted successfully' });
  });
});

module.exports = router; 