const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all transactions
router.get('/', (req, res) => {
  try {
    const transactions = db.prepare('SELECT * FROM transactions ORDER BY date DESC').all();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add new transaction
router.post('/', (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;
    const stmt = db.prepare(`
      INSERT INTO transactions (type, amount, description, category, date)
      VALUES (@type, @amount, @description, @category, @date)
    `);
    const result = stmt.run({ type, amount, description, category, date });
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete transaction
router.delete('/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update transaction
router.put('/:id', (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;
    const stmt = db.prepare(`
      UPDATE transactions 
      SET type = @type, amount = @amount, description = @description,
          category = @category, date = @date
      WHERE id = @id
    `);
    stmt.run({ ...req.body, id: req.params.id });
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;