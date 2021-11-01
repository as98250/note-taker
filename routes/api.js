const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
  } = require('../helpers/fsUtils');
const db = require('../db/db.json');
// const fs = require('fs');
const savedNotes = db && db.length ? db : [];

router.get('/api/notes', (req, res) => {
    readFromFile(savedNotes).then((data) => res.json(JSON.parse(data)));
});

router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding Note');
    }

}
);

router.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile(savedNotes)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No Note with that ID');
    });
});
router.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile(savedNotes)
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const result = json.filter((note) => note.note_id !== noteId);
        writeToFile(db, result);
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

  
  module.exports = router;