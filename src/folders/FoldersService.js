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
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into("noteful-api")
      .returning("*")
      .then(rows => {
        return rows[0];
      });
  },
  deleteFolder(knex, id) {
    return knex("noteful-api")
      .where({ id })
      .delete();
  },
  updateFolder(knex, id, newFolderFields) {
    return knex("noteful-api")
      .where({ id })
      .update(newFolderFields);
  }
};

module.exports = FoldersService;
