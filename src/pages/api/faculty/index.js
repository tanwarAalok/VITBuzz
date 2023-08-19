const connectDatabase = require("../../../utils/db");
import { FacultyController } from "src/server/controllers";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  connectDatabase();

  // *********************************************************************

  switch (req.method) {
    case "POST":
        await FacultyController.createFaculty(req, res);
      break;

    case "GET":
      await FacultyController.getAllFaculty(req, res);
      break;

    default:
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Not a valid request" });
      break;
  }
}
