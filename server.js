const express = require('express');
const cors = require('cors');
const db = require('./database');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- EMPLOYEES ---
app.get('/api/employees', (req, res) => {
  const employees = db.prepare('SELECT * FROM employees').all();
  res.json(employees);
});

// --- ATTENDACE ---
app.post('/api/attendance/clock-in, (req, res) => {
  const { emp_id, time, date, status ) = req.body;
  try {
    const stmt = db.prepare('INSERT INTO attendance (emp_id, date, clock_in, status) VALUES (?, ?, ?, ?)');
    stmt.run(emp_id, date, time, status);
    res.json({ success: true});
  } catch (err) { 
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/attendance/clock-out', (req, res) => {
  const { emp_od, date, time } = req.body; 
  try { 
    const stmt = bd.prepare('UPDATE attendance SET clock_out = ? WHERE emp_id =? AND date = ?');
    stmt.run(time, emp_id, date);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

pp.get('/api/leave/:emp_id;, (req, res) => {
  const request = db.prepare('SELECT * FROM leave_requests WHERE emp_id = ? 
  const employee = db.prepare('SELECT leave_balance_annual, leave_balance_medical FROM employees WHERE emp_id = ?').get(req.params.emp_id);
  res.json({ requests, balances: employee });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('✅ HRMS Server running on http://localhost:${PORT}');
});
