const router = require('express').Router();
const uuid = require('../helpers/uuid');
const db = require('../db/db.json');
const fs = require('fs');

router.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

router.post('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/db.json'))
);
  
  module.exports = router;