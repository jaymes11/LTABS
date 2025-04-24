const db = require('../db/connection');

class Laptop {
  // Get all laptops
  static getAll(callback) {
    const query = 'SELECT * FROM Laptop';
    db.query(query, callback);
  }

  // Get laptop by ID
  static getById(laptopId, callback) {
    const query = 'SELECT * FROM Laptop WHERE LaptopId = ?';
    db.query(query, [laptopId], callback);
  }

  // Get laptop by serial number
  static getBySerialNumber(serialNumber, callback) {
    const query = 'SELECT * FROM Laptop WHERE SerialNumber = ?';
    db.query(query, [serialNumber], callback);
  }

  // Create new laptop
  static create(laptopData, callback) {
    const query = 'INSERT INTO Laptop SET ?';
    db.query(query, laptopData, callback);
  }

  // Update laptop
  static update(laptopId, laptopData, callback) {
    const query = 'UPDATE Laptop SET ? WHERE LaptopId = ?';
    db.query(query, [laptopData, laptopId], callback);
  }

  // Delete laptop
  static delete(laptopId, callback) {
    const query = 'DELETE FROM Laptop WHERE LaptopId = ?';
    db.query(query, [laptopId], callback);
  }

  // Get available laptops (not in Transaction with null ReturnDate)
  static getAvailable(callback) {
    const query = `
      SELECT l.* FROM Laptop l
      WHERE l.LaptopId NOT IN (
        SELECT t.LaptopId FROM Transaction t
        WHERE t.ReturnDate IS NULL
      )
    `;
    db.query(query, callback);
  }
}

module.exports = Laptop; 