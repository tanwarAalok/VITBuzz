const connectDatabase = require("../../utils/db");
import { SuccessResponse } from "@/utils/common";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";
const { Paper } = require("../../models");

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
    case "POST":
      try {
        const newPaper = await Paper.create(req.body);
        SuccessResponse.data = newPaper;
        SuccessResponse.message = "Successfully added new paper";
        res.status(StatusCodes.CREATED).json(SuccessResponse);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;
    case "GET":
      try {
        const customFilters = {};
        if (req.query.faculty && req.query.faculty !== "") {
          customFilters.facultyName = req.query.faculty;
        }

        if (req.query.course && req.query.course !== "") {
          customFilters.courseTitle = req.query.course;
        }

        if (req.query.paperType && req.query.paperType !== "") {
          customFilters.paperType = req.query.paperType;
        }
        const data = await Paper.aggregate([{ $match: customFilters }]);
        SuccessResponse.data = data;
        SuccessResponse.message = "Successfully fetched papers";
        res.status(StatusCodes.OK).json(SuccessResponse);
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Default request" });
      break;
  }
}
