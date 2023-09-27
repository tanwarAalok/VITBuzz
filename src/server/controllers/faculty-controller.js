const { FacultyService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../../utils/common");

async function createFaculty(req, res) {
  try {
    const data = await FacultyService.createFaculty({
      name: req.body.name,
      email: req.body.email,
      image: req.body.image,
      description: req.body.description,
      gender: req.body.gender,
      approved: req.body.approved,
    });

    SuccessResponse.message = "Successfully created a new Faculty";
    SuccessResponse.data = data;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllFaculty(req, res) {
  try {
    const data = await FacultyService.getAllFaculty(req.query);
    SuccessResponse.message = "Successfully fetched all faculty";
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getFacultyById(req, res) {
  try {
    const data = await FacultyService.getFacultyById(req.query.id);
    SuccessResponse.message = "Successfully fetched faculty";
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateFaculty(req, res) {
  try {
    const data = await FacultyService.updateFaculty(req.query.id);
    SuccessResponse.message = "Successfully updated faculty";
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getTopFaculty(req, res) {
  try {
    const data = await FacultyService.getTopFaculty();
    SuccessResponse.message = "Successfully fetched top faculty";
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}


module.exports = {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  getTopFaculty,
  updateFaculty,
};
