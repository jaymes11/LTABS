const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ success: false, message: 'Error fetching users' });
    }
    res.json({ success: true, data: results });
  });
});

// Get a specific user
router.get('/:id', (req, res) => {
  User.getById(req.params.id, (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ success: false, message: 'Error fetching user' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: results[0] });
  });
});

// Create a new user
router.post('/', (req, res) => {
  // Generate a unique user ID
  const userId = `USR${Date.now()}`;
  const newUser = {
    UserId: userId,
    ...req.body
  };

  User.create(newUser, (err, result) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ success: false, message: 'Error creating user' });
    }
    res.status(201).json({ success: true, data: { UserId: userId, ...req.body } });
  });
});

// Update a user
router.put('/:id', (req, res) => {
  User.update(req.params.id, req.body, (err, result) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ success: false, message: 'Error updating user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User updated successfully' });
  });
});

// Delete a user
router.delete('/:id', (req, res) => {
  User.delete(req.params.id, (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ success: false, message: 'Error deleting user' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  });
});

module.exports = router; 