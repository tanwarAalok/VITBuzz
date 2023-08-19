const { ClubService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../../utils/common");

async function createClub(req, res) {
  try {
    const data = await ClubService.createClub({
      name: req.body.name,
      image: req.body.image,
      clubType: req.body.clubType,
      linkedIn: req.body.linkedIn,
      instagram: req.body.instagram,
    });

    SuccessResponse.message = "Successfully created a new Club";
    SuccessResponse.data = data;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllClubs(req, res) {
  try {
    const data = await ClubService.getAllClubs();
    SuccessResponse.message = "Successfully fetched all clubs";
    SuccessResponse.data = data;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
    createClub,
    getAllClubs
}