const CrudRepository = require("./crud-repository");
const { Club } = require("../models");

class ClubRepository extends CrudRepository {
  constructor() {
    super(Club);
  }
}

module.exports = ClubRepository;
