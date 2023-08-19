const { UserRepository } = require("../repositories");
const userRepository = new UserRepository();
const AppError = require("../../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

async function createUser(data) {
  try {
    const response = await userRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong creating user - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllUsers() {
  try {
    const response = await userRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching all users - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUser(id) {
  try {
    const response = await userRepository.get(id);
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching  user - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getUserByEmail(email) {
  try {
    const response = await userRepository.findUserByEmail(email);
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching user - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}


module.exports = {
  getUserByEmail,
  getAllUsers,
  getUser,
  createUser,
};
