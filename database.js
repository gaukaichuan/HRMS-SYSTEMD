const Database = require('better-sqlite3');
const db = new Database('hrms.db');

//Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS employees ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    emp_id TEXT UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    department TEXT NOT NULL,
    role TEXT NOT NULL, 
    leave_balance_annual INTEGER DEFAULT 14,
    leave_balance_medical INTEGER DEFAULT 14,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emp_id TEXT NOT NULL,
    date TEXT NOT NULL,
    clock_in TEXT,
    clock_out TEXT, 
    status TEXT DEFAULT 'Present',
    FOREIGN KEY (emp_id) REFERENCES employes(emp_id)
  );
`);

//Insert a sample employee if none exist 
const count = db.prepare('SELECT COUNT(*) as count FROM employees').get();
if(count.count === 0) {
  db.prepare(`INSERT INTO employees (emp_id, name, email, department, role)
             VALUES ('EMP-001', 'Jordan Lee', 'jordan@example.com', 'Engineering', 'Software Engineer')`).run();
}

module.exports = db;
