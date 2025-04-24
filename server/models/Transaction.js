const db = require('../db/connection');

class Transaction {
  // Get all transactions
  static getAll(callback) {
    const query = `
      SELECT t.*, u.FirstName, u.LastName, l.Brand, l.Model, l.SerialNumber
      FROM Transaction t
      JOIN User u ON t.UserId = u.UserId
      JOIN Laptop l ON t.LaptopId = l.LaptopId
    `;
    db.query(query, callback);
  }

  // Get transaction by ID
  static getById(transactionId, callback) {
    const query = `
      SELECT t.*, u.FirstName, u.LastName, l.Brand, l.Model, l.SerialNumber
      FROM Transaction t
      JOIN User u ON t.UserId = u.UserId
      JOIN Laptop l ON t.LaptopId = l.LaptopId
      WHERE t.TransactionId = ?
    `;
    db.query(query, [transactionId], callback);
  }

  // Get transactions by user ID
  static getByUser(userId, callback) {
    const query = `
      SELECT t.*, l.Brand, l.Model, l.SerialNumber
      FROM Transaction t
      JOIN Laptop l ON t.LaptopId = l.LaptopId
      WHERE t.UserId = ?
    `;
    db.query(query, [userId], callback);
  }

  // Get transactions by laptop ID
  static getByLaptop(laptopId, callback) {
    const query = `
      SELECT t.*, u.FirstName, u.LastName
      FROM Transaction t
      JOIN User u ON t.UserId = u.UserId
      WHERE t.LaptopId = ?
    `;
    db.query(query, [laptopId], callback);
  }

  // Create new transaction
  static create(transactionData, callback) {
    const query = 'INSERT INTO Transaction SET ?';
    db.query(query, transactionData, callback);
  }

  // Update transaction (e.g., add return date)
  static update(transactionId, transactionData, callback) {
    const query = 'UPDATE Transaction SET ? WHERE TransactionId = ?';
    db.query(query, [transactionData, transactionId], callback);
  }

  // Delete transaction
  static delete(transactionId, callback) {
    const query = 'DELETE FROM Transaction WHERE TransactionId = ?';
    db.query(query, [transactionId], callback);
  }

  // Get active borrows (where ReturnDate is NULL)
  static getActiveBorrows(callback) {
    const query = `
      SELECT t.*, u.FirstName, u.LastName, l.Brand, l.Model, l.SerialNumber
      FROM Transaction t
      JOIN User u ON t.UserId = u.UserId
      JOIN Laptop l ON t.LaptopId = l.LaptopId
      WHERE t.ReturnDate IS NULL
    `;
    db.query(query, callback);
  }
}

module.exports = Transaction; 