const { ClubRepository } = require("../repositories");
const clubRepository = new ClubRepository();
const AppError = require("../../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

async function createClub(data) {
  try {
    const response = await clubRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while creating new club - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllClubs() {
  try {
    const response = await clubRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching all clubs - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createClub,
  getAllClubs
}
