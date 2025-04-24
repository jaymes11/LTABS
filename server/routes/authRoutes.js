const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  Admin.getByUsername(username, (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ success: false, message: 'Error during login' });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const admin = results[0];

    // In a real application, you would use bcrypt to compare hashed passwords
    // For simplicity, we're directly comparing passwords here
    if (admin.Password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Send admin info (excluding password)
    const { Password, ...adminData } = admin;
    res.json({ success: true, data: adminData });
  });
});

// Register a new admin
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  // Check if admin already exists
  Admin.getByUsername(username, (err, results) => {
    if (err) {
      console.error('Error checking admin existence:', err);
      return res.status(500).json({ success: false, message: 'Error registering admin' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    // Generate a unique admin ID
    const adminId = `ADM${Date.now()}`;
    const newAdmin = {
      AdminId: adminId,
      Username: username,
      Password: password // In a real app, hash the password before storing
    };

    Admin.create(newAdmin, (createErr) => {
      if (createErr) {
        console.error('Error creating admin:', createErr);
        return res.status(500).json({ success: false, message: 'Error registering admin' });
      }

      // Send admin info (excluding password)
      const { Password, ...adminData } = newAdmin;
      res.status(201).json({ success: true, data: adminData });
    });
  });
});

module.exports = router; 