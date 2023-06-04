const CrudRepository = require("./crud-repository");
const { User } = require("../models");
const AppError = require("@/utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findUserByEmail(email) {
    const response = await User.findOne({ email: email }).populate({
      path: "likedReview",
    });
    return response;
  }

}

module.exports = UserRepository;
