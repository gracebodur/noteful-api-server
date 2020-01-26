const path = require("path");
const express = require("express");
const xss = require("xss");
const NotesService = require("./NotesService");

const jsonParser = express.json();
const NotesRouter = express.Router();

const serializeNote = note => ({
  noteid: note.noteid,
  note_name: xss(note.note_name),
  modified: note.modified,
  folderid:Number(note.folderid),
  content: xss(note.content)
});

NotesRouter.route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NotesService.getAllNotes(knexInstance)
      .then(notes => {
        if(!notes) {
          return res.status(400).json({
            error: { message: `Note doesn't exist`}
          })
        }
        res.json(notes.map(serializeNote));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { note_name, folderid, content } = req.body;
    const newNote = { note_name, folderid, content };

    for (const [key, value] of Object.entries(newNote)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
      }
    }

    NotesService.insertNote(req.app.get("db"), newNote)
      .then(note => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `${newNote.noteid}`))
          .json(serialize(newNote));
      })
      .catch(next);
  });

NotesRouter.route("/:noteid")
.all((req, res, next) => {
  NotesService.getById(req.app.get("db"), req.params.noteid)
    .then(note => {
      if (!note) {
        return res.status(404).json({
          error: { message: `Note doesn't exist` }
        });
      }
      res.note = note;
      next();
    })
    .catch(next);
  })
  .get((req, res, next) => {
      res.json(serializeNote(res.note));
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get("db"), req.params.noteid)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { note_name, folderid, content } = req.body;
    const noteToUpdate = { note_name, folderid, content };

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a 'note name', 'folderid' or 'content' `
        }
      });
    }

    noteToUpdate.modified = new Date();
    
    NotesService.updateNote(req.app.get("db"), req.params.noteid, noteToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = NotesRouter;
