const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [];

app.post('/users', (req, res) => {
  const { name, email, phone, gender } = req.body;
  if (!name || !email || !phone || !gender) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newUser = { id: Date.now(), name, email, phone, gender };
  users.push(newUser);
  res.status(201).json({ message: 'User added successfully', user: newUser });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});