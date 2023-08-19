const connectDatabase = require("../../../utils/db");
import { User } from "src/server/models";
import { ErrorResponse, SuccessResponse } from "@/utils/common";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";

connectDatabase();

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  // *********************************************************************

  const { email } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const user = await User.findOne({ email }).populate({
          path: "likedReview",
        });

        SuccessResponse.data = user;
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
