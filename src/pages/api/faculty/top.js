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

  switch (req.method) {
    case "GET":
      try {
        const allFaculty = await Faculty.find({});
        const topFaculty = allFaculty
          ?.sort((a, b) => b.overallRating - a.overallRating)
          .slice(0, 3);
        SuccessResponse.data = topFaculty;
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
