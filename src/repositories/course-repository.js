const CrudRepository = require("./crud-repository");
const { Course } = require("../models");

class CourseRepository extends CrudRepository {
  constructor() {
    super(Course);
  }
}

module.exports = CourseRepository;
