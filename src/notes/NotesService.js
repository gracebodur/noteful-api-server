const NotesService = {
  getAllNotes(knex) {
    return knex.select("*").from("notes");
  },
  getById(knex, id) {
    return knex
      .from("notes")
      .select("*")
      .where("id", id)
      .first();
  },
  insertnote(knex, newNote) {
    return knex
      .insert(newNote)
      .into("notes")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deletenote(knex, id) {
    return knex("notes")
      .where({ id })
      .delete();
  },
  updatenote(knex, id, newNoteFields) {
    return knex("notes")
      .where({ id })
      .update(newNoteFields);
  }
};

module.exports = NotesService;
