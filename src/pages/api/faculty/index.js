const connectDatabase = require("../../../utils/db");
import { ErrorResponse, SuccessResponse } from "@/utils/common";
import AppError from "@/utils/error/app-error";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";
const Faculty = require("../../../models/FacultyModel");

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  connectDatabase();

  // *********************************************************************

  const { email } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const faculty = await Faculty.findOne({ email });
        if (faculty)
          return new AppError(
            "Faculty already exists",
            StatusCodes.BAD_REQUEST
          );

        await Faculty.create(req.body);
        res.status(StatusCodes.CREATED).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }
      break;

    case "GET":
      try {
        const customFilters = {};
        const sortFilter = {};
        const aggregateArray = [];

        if (req.query.gender && req.query.gender !== "") {
          customFilters.gender = req.query.gender;
        }

        if (req.query.sortType && req.query.sortType !== "") {
          sortFilter.overallRating = parseInt(req.query.sortType);
        }

        aggregateArray.push({ $match: customFilters });

        if (Object.keys(sortFilter).length != 0) {
          aggregateArray.push({ $sort: sortFilter });
        }
        
        const data = await Faculty.aggregate(aggregateArray);

        SuccessResponse.data = data;
        res.status(StatusCodes.OK).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }
      break;

    default:
      ErrorResponse.error.explanation = "Not a valid request";
      res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      break;
  }
}
