const { CourseService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../../utils/common");

async function createCourse(req, res) {
  try {
    const newCourse = await CourseService.createCourse({
      courseTitle: req.body.courseTitle,
      courseCode: req.body.courseCode,
      semester: req.body.semester,
      approved: req.body.approved,
    });

    SuccessResponse.message = "Successfully created a new Course";
    SuccessResponse.data = newCourse;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllCourses(req, res) {
  try {
    const courses = await CourseService.getAllCourses();
    SuccessResponse.message = "Successfully fetched all courses";
    SuccessResponse.data = courses;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
    createCourse,
    getAllCourses
}