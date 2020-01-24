const path = require("path");
const express = require("express");
const NotesService = require("./NotesService");

const jsonParser = express.json();
const NotesRouter = express.Router();

NotesRouter.route("/notes")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    NotesService.getAllNotes(knexInstance)
      .then(notes => {
        res.json(notes);
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
          .location(path.posix.join(req.originalUrl, `${newNote.id}`))
          .json(newNote);
      })
      .catch(next);
  });

NotesRouter.route("/notes/:id")
  .get((req, res) => {
    const { id } = req.params;
    const note = notes.find(n => n.id == id);
    NotesService.getNoteById(req.app.get("db"), id)
      .then(note => {
        if (!note) {
          return res.status(404).json({
            error: { message: `Note doesn't exist` }
          });
        }
        res.json(note);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    NotesService.deleteNote(req.app.get("db"), req.params.id)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { note_name } = req.body;
    const noteToUpdate = { note_name };

    const numberOfValues = Object.values(noteToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain a note name`
        }
      });
    }
    NotesService.updateNote(req.app.get("db"), req.params.id, noteToUpdate)
      .then(numRowsAffected => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = NotesRouter;
