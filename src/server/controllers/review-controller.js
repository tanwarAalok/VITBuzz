const { ReviewService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../../utils/common");

async function createFacultyReview(req, res) {
  try {
    await ReviewService.createFacultyReview(
      {
        comment: req.body.comment,
        avgRating: req.body.avgRating,
        paperRating: req.body.paperRating,
        behaviourRating: req.body.behaviourRating,
        teachingRating: req.body.teachingRating,
        userData: req.body.userData,
      },
      req.query.facultyId
    );

    SuccessResponse.message = "Successfully created a new Review";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFacultyReview(req, res) {
  try {
    const data = await ReviewService.getFacultyReviews(req.query.facultyId);
    SuccessResponse.message = "Successfully fetched Faculty reviews";
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function voteReview(req, res) {
  try {
    await ReviewService.voteReview(req.body);
    SuccessResponse.message = "Successfully voted review";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createFacultyReview,
  getFacultyReview,
  voteReview,
};