const { CourseRepository } = require("../repositories");
const courseRepository = new CourseRepository();
const AppError = require("../../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

async function createCourse(data) {
  try {
    const newCourse = await courseRepository.create(data);
    return newCourse;
  } catch (error) {
    throw new AppError(
      `Something went wrong while creating new course - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllCourses() {
  try {
    const allCourses = await courseRepository.getAll();
    return allCourses
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching all courses - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createCourse,
  getAllCourses
}
