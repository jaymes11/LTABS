const db = require('../db/connection');

class User {
  // Get all users
  static getAll(callback) {
    const query = 'SELECT * FROM User';
    db.query(query, callback);
  }

  // Get user by ID
  static getById(userId, callback) {
    const query = 'SELECT * FROM User WHERE UserId = ?';
    db.query(query, [userId], callback);
  }

  // Get user by email
  static getByEmail(email, callback) {
    const query = 'SELECT * FROM User WHERE Email = ?';
    db.query(query, [email], callback);
  }

  // Create new user
  static create(userData, callback) {
    const query = 'INSERT INTO User SET ?';
    db.query(query, userData, callback);
  }

  // Update user
  static update(userId, userData, callback) {
    const query = 'UPDATE User SET ? WHERE UserId = ?';
    db.query(query, [userData, userId], callback);
  }

  // Delete user
  static delete(userId, callback) {
    const query = 'DELETE FROM User WHERE UserId = ?';
    db.query(query, [userId], callback);
  }

  // Get users by role
  static getByRole(role, callback) {
    const query = 'SELECT id, name, email, role, student_id, contact_number, created_at FROM users WHERE role = ?';
    db.query(query, [role], callback);
  }
}

module.exports = User; 