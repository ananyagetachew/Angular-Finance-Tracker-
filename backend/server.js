const express = require('express');
const Database = require('better-sqlite3');
const app = express();
const port = 3000;

const db = new Database('finance.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    description TEXT,
    category TEXT,
    date TEXT NOT NULL
  )
`);

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
  const transactions = db.prepare('SELECT * FROM transactions ORDER BY date DESC').all();
  res.json(transactions);
});

// Add new transaction
app.post('/api/transactions', (req, res) => {
  const { type, amount, description, category, date } = req.body;
  const stmt = db.prepare(`
    INSERT INTO transactions (type, amount, description, category, date)
    VALUES (@type, @amount, @description, @category, @date)
  `);
  const result = stmt.run({ type, amount, description, category, date });
  res.json({ id: result.lastInsertRowid, ...req.body });
});

// Delete transaction
app.delete('/api/transactions/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM transactions WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ success: true });
});

// Update transaction
app.put('/api/transactions/:id', (req, res) => {
  const { type, amount, description, category, date } = req.body;
  const stmt = db.prepare(`
    UPDATE transactions 
    SET type = @type, amount = @amount, description = @description,
        category = @category, date = @date
    WHERE id = @id
  `);
  stmt.run({ ...req.body, id: req.params.id });
  res.json({ id: req.params.id, ...req.body });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});