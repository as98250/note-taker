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
    res.json(savedNotes);
});

router.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  savedNotes.push(newNote);

      readAndAppend(newNote, './db/db.json');
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in posting note');
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