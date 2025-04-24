const db = require('../db/connection');

class Alert {
  // Get all alerts
  static getAll(callback) {
    const query = `
      SELECT a.*, u.FirstName, u.LastName
      FROM Alert a
      JOIN User u ON a.UserId = u.UserId
    `;
    db.query(query, callback);
  }

  // Get alert by ID
  static getById(alertId, callback) {
    const query = `
      SELECT a.*, u.FirstName, u.LastName
      FROM Alert a
      JOIN User u ON a.UserId = u.UserId
      WHERE a.AlertId = ?
    `;
    db.query(query, [alertId], callback);
  }

  // Get alerts by user ID
  static getByUser(userId, callback) {
    const query = 'SELECT * FROM Alert WHERE UserId = ?';
    db.query(query, [userId], callback);
  }

  // Create new alert
  static create(alertData, callback) {
    const query = 'INSERT INTO Alert SET ?';
    db.query(query, alertData, callback);
  }

  // Update alert (e.g., mark as read/resolved)
  static update(alertId, alertData, callback) {
    const query = 'UPDATE Alert SET ? WHERE AlertId = ?';
    db.query(query, [alertData, alertId], callback);
  }

  // Delete alert
  static delete(alertId, callback) {
    const query = 'DELETE FROM Alert WHERE AlertId = ?';
    db.query(query, [alertId], callback);
  }

  // Get unread alerts
  static getUnread(callback) {
    const query = `
      SELECT a.*, u.FirstName, u.LastName
      FROM Alert a
      JOIN User u ON a.UserId = u.UserId
      WHERE a.Status = 'unread'
    `;
    db.query(query, callback);
  }
}

module.exports = Alert; 