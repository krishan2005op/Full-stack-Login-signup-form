const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'krishan1)(*', 
  database: 'userdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.post('/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  const query = 'INSERT INTO users2 (name, email, phone, password) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error registering user' });
      throw err;
    }
    res.send({ message: 'User registered successfully' });
  });
});

app.post('/login', (req, res) => {
  const { emailOrPhone, password } = req.body;
  const query = 'SELECT * FROM users2 WHERE (email = ? OR phone = ?) AND password = ?';
  db.query(query, [emailOrPhone, emailOrPhone, password], (err, result) => {
    if (err) {
      res.status(500).send({ message: 'Error logging in' });
      throw err;
    }
    if (result.length > 0) {
      res.send({ success: true });
    } else {
      res.send({ success: false, message: 'Incorrect email/phone or password' });
    }
  });
});

app.listen(5010, () => {
  console.log('Server started on port 5010');
});
