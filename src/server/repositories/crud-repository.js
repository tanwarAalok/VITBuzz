const AppError = require("../../utils/error/app-error");
const { StatusCodes } = require("http-status-codes")

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async deleteOne(id) {
    const response = await this.model.deleteOne(id);
    return response;
  }

  async get(id) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new AppError(
        "Not able to find the resource",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.find();
    return response;
  }

  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return response;
  }
}

module.exports = CrudRepository;
