const connectDatabase = require("../../../utils/db");
import { ReviewController } from "src/server/controllers";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";

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
    case "POST":
      await ReviewController.createFacultyReview(req, res);
      break;
    case "GET":
      await ReviewController.getFacultyReview(req, res);
      break;

    default:
      res.status(StatusCodes.BAD_REQUEST).json({message: "Invalid Request"});
      break;
  }
}
