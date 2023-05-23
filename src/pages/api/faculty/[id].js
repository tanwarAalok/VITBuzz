const connectDatabase = require("../../../utils/db");
import { ErrorResponse, SuccessResponse } from "@/utils/common";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";
const { Faculty } = require("../../../models");

connectDatabase();

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  // *********************************************************************

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        const faculty = await Faculty.findById(id).populate({
          path: "reviews",
          populate: {
            path: "user",
          },
        });
        SuccessResponse.data = faculty;
        res.status(StatusCodes.OK).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }
      break;
    case "PUT":
      try {
        const faculty = await Faculty.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true,
            useFindAndModify: false,
          }
        );
        SuccessResponse.data = faculty;
        res.status(StatusCodes.OK).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }

    case "DELETE":
      try {
        const blog = await Faculty.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({ success: true, message: "Faculty deleted successfully" });
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }

    default:
      ErrorResponse.error.explanation = "Not a valid request";
      res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      break;
  }
}
