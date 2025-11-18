const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_for_prod';

// in-memory store
let events = [{title:'Welcome Service', date:'2025-11-23'}];

// single admin user
const admin = { username:'admin', passwordHash: bcrypt.hashSync('admin123', 8) };

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if(username === admin.username && bcrypt.compareSync(password, admin.passwordHash)){
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '3h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

app.get('/api/verify', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    return res.json({ ok: true, user: data.user });
  } catch (e) {
    return res.status(401).json({ error: 'invalid' });
  }
});

app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const auth = req.headers.authorization || '';
  const token = auth.split(' ')[1];
  try {
    jwt.verify(token, JWT_SECRET);
    const { title, date } = req.body;
    if(title) events.push({ title, date });
    return res.json(events);
  } catch (e) {
    return res.status(401).json({ error: 'invalid' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server running on', PORT));
