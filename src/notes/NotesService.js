const NotesService = {
  getAllNotes(knex) {
    return knex.select("*").from("noteful-api");
  },
  getById(knex, id) {
    return knex
      .from("noteful-api")
      .select("*")
      .where("id", id)
      .first();
  },
  insertnote(knex, newNote) {
    return knex
      .insert(newNote)
      .into("noteful-api")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deletenote(knex, id) {
    return knex("noteful-api")
      .where({ id })
      .delete();
  },
  updatenote(knex, id, newNoteFields) {
    return knex("noteful-api")
      .where({ id })
      .update(newNoteFields);
  }
};

module.exports = NotesService;
