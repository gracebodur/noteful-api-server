const NotesService = {
  getAllNotes(knex) {
    return knex.select("*").from("notes");
  },
  getById(knex, id) {
    return knex
      .from("notes")
      .select("*")
      .where("noteid", id)
      .first();
  },
  insertNote(knex, newNote) {
    return knex
      .insert(newNote)
      .into("notes")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deleteNote(knex, id) {
    return knex("notes")
      .where('noteid', id )
      .delete();
  },
  updateNote(knex, id, newNoteFields) {
    return knex("notes")
      .where('noteid', id)
      .update(newNoteFields);
  }
};

module.exports = NotesService;
