const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const ActivityLog = require('../models/ActivityLog');

// Get all transactions
router.get('/', (req, res) => {
  Transaction.getAll((err, results) => {
    if (err) {
      console.error('Error fetching transactions:', err);
      return res.status(500).json({ success: false, message: 'Error fetching transactions' });
    }
    res.json({ success: true, data: results });
  });
});

// Get active borrows
router.get('/active', (req, res) => {
  Transaction.getActiveBorrows((err, results) => {
    if (err) {
      console.error('Error fetching active borrows:', err);
      return res.status(500).json({ success: false, message: 'Error fetching active borrows' });
    }
    res.json({ success: true, data: results });
  });
});

// Get a specific transaction
router.get('/:id', (req, res) => {
  Transaction.getById(req.params.id, (err, results) => {
    if (err) {
      console.error('Error fetching transaction:', err);
      return res.status(500).json({ success: false, message: 'Error fetching transaction' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }
    res.json({ success: true, data: results[0] });
  });
});

// Get transactions by user
router.get('/user/:userId', (req, res) => {
  Transaction.getByUser(req.params.userId, (err, results) => {
    if (err) {
      console.error('Error fetching user transactions:', err);
      return res.status(500).json({ success: false, message: 'Error fetching user transactions' });
    }
    res.json({ success: true, data: results });
  });
});

// Get transactions by laptop
router.get('/laptop/:laptopId', (req, res) => {
  Transaction.getByLaptop(req.params.laptopId, (err, results) => {
    if (err) {
      console.error('Error fetching laptop transactions:', err);
      return res.status(500).json({ success: false, message: 'Error fetching laptop transactions' });
    }
    res.json({ success: true, data: results });
  });
});

// Create a new borrow transaction
router.post('/', (req, res) => {
  // Generate a unique transaction ID
  const transactionId = `TRX${Date.now()}`;
  const newTransaction = {
    TransactionId: transactionId,
    ...req.body,
    BorrowDate: new Date(),
    ReturnDate: null
  };

  Transaction.create(newTransaction, (err, result) => {
    if (err) {
      console.error('Error creating transaction:', err);
      return res.status(500).json({ success: false, message: 'Error creating transaction' });
    }

    // Log the activity
    if (req.body.AdminId) {
      ActivityLog.logActivity(
        req.body.UserId,
        req.body.AdminId,
        'Borrowed laptop',
        (logErr) => {
          if (logErr) {
            console.error('Error logging activity:', logErr);
          }
        }
      );
    }

    res.status(201).json({ success: true, data: { TransactionId: transactionId, ...newTransaction } });
  });
});

// Return a laptop
router.put('/return/:id', (req, res) => {
  const returnData = {
    ReturnDate: new Date()
  };

  Transaction.update(req.params.id, returnData, (err, result) => {
    if (err) {
      console.error('Error returning laptop:', err);
      return res.status(500).json({ success: false, message: 'Error returning laptop' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Log the activity
    if (req.body.AdminId && req.body.UserId) {
      ActivityLog.logActivity(
        req.body.UserId,
        req.body.AdminId,
        'Returned laptop',
        (logErr) => {
          if (logErr) {
            console.error('Error logging activity:', logErr);
          }
        }
      );
    }

    res.json({ success: true, message: 'Laptop returned successfully' });
  });
});

module.exports = router; 