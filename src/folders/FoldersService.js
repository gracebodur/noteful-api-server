const FoldersService = {
  getAllFolders(knex) {
    return knex.select("*").from("noteful-api");
  },
  getById(knex, id) {
    return knex
      .from("noteful-api")
      .select("*")
      .where("id", id)
      .first();
  },
  insertfolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into("noteful-api")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deletefolder(knex, id) {
    return knex("noteful-api")
      .where({ id })
      .delete();
  },
  updatefolder(knex, id, newFolderFields) {
    return knex("noteful-api")
      .where({ id })
      .update(newFolderFields);
  }
};

module.exports = FoldersService;
