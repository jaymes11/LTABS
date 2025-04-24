const db = require('../db/connection');

class ActivityLog {
  // Get all activity logs
  static getAll(callback) {
    const query = `
      SELECT l.*, u.FirstName, u.LastName, a.Username
      FROM ActivityLog l
      JOIN User u ON l.UserId = u.UserId
      JOIN Admin a ON l.AdminId = a.AdminId
    `;
    db.query(query, callback);
  }

  // Get activity log by ID
  static getById(logId, callback) {
    const query = `
      SELECT l.*, u.FirstName, u.LastName, a.Username
      FROM ActivityLog l
      JOIN User u ON l.UserId = u.UserId
      JOIN Admin a ON l.AdminId = a.AdminId
      WHERE l.LogId = ?
    `;
    db.query(query, [logId], callback);
  }

  // Get activity logs by user ID
  static getByUser(userId, callback) {
    const query = `
      SELECT l.*, a.Username
      FROM ActivityLog l
      JOIN Admin a ON l.AdminId = a.AdminId
      WHERE l.UserId = ?
    `;
    db.query(query, [userId], callback);
  }

  // Get activity logs by admin ID
  static getByAdmin(adminId, callback) {
    const query = `
      SELECT l.*, u.FirstName, u.LastName
      FROM ActivityLog l
      JOIN User u ON l.UserId = u.UserId
      WHERE l.AdminId = ?
    `;
    db.query(query, [adminId], callback);
  }

  // Create new activity log
  static create(logData, callback) {
    const query = 'INSERT INTO ActivityLog SET ?';
    db.query(query, logData, callback);
  }

  // Log admin activity
  static logActivity(userId, adminId, activityType, callback) {
    const logData = {
      LogId: `LOG${Date.now()}`,
      UserId: userId,
      AdminId: adminId,
      ActivityDate: new Date(),
      ActivityType: activityType
    };
    this.create(logData, callback);
  }

  // Get activity logs by date range
  static getByDateRange(startDate, endDate, callback) {
    const query = `
      SELECT l.*, u.FirstName, u.LastName, a.Username
      FROM ActivityLog l
      JOIN User u ON l.UserId = u.UserId
      JOIN Admin a ON l.AdminId = a.AdminId
      WHERE l.ActivityDate BETWEEN ? AND ?
    `;
    db.query(query, [startDate, endDate], callback);
  }
}

module.exports = ActivityLog; 