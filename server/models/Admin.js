const db = require('../db/connection');

class Admin {
  // Get all admins
  static getAll(callback) {
    const query = 'SELECT AdminId, Username FROM Admin';
    db.query(query, callback);
  }

  // Get admin by ID
  static getById(adminId, callback) {
    const query = 'SELECT AdminId, Username FROM Admin WHERE AdminId = ?';
    db.query(query, [adminId], callback);
  }

  // Get admin by username (for authentication)
  static getByUsername(username, callback) {
    const query = 'SELECT * FROM Admin WHERE Username = ?';
    db.query(query, [username], callback);
  }

  // Create new admin
  static create(adminData, callback) {
    const query = 'INSERT INTO Admin SET ?';
    db.query(query, adminData, callback);
  }

  // Update admin
  static update(adminId, adminData, callback) {
    const query = 'UPDATE Admin SET ? WHERE AdminId = ?';
    db.query(query, [adminData, adminId], callback);
  }

  // Delete admin
  static delete(adminId, callback) {
    const query = 'DELETE FROM Admin WHERE AdminId = ?';
    db.query(query, [adminId], callback);
  }

  // Verify admin credentials
  static verify(username, password, callback) {
    // In a real application, you would hash the password and compare
    const query = 'SELECT * FROM Admin WHERE Username = ? AND Password = ?';
    db.query(query, [username, password], callback);
  }
}

module.exports = Admin; 