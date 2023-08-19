const connectDatabase = require("../../../utils/db");
import { FacultyController } from "src/server/controllers";
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
    case "GET":
      await FacultyController.getTopFaculty(req, res);
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Not a valid request" });
      break;
  }
}
