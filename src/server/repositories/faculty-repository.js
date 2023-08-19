const CrudRepository = require("./crud-repository");
const { Faculty } = require("../models");
const AppError = require("@/utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

class FacultyRepository extends CrudRepository {
  constructor() {
    super(Faculty);
  }

  async getAll(aggregateArray) {
      const response = await Faculty.aggregate(aggregateArray);
      return response;
  }

  async getReviews(id) {
     const response = await Faculty.findById(id).populate({
       path: "reviews",
       populate: {
         path: "user",
       },
     })
    
     if (!response) {
       throw new AppError(
         "Not able to find the faculty, Check if 'id' is valid",
         StatusCodes.NOT_FOUND
       );
     }
     return response;
  }
}

module.exports = FacultyRepository;
