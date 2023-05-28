const connectDatabase = require("../../utils/db");
import { SuccessResponse } from "@/utils/common";
import { StatusCodes } from "http-status-codes";
import NextCors from "nextjs-cors";
const Club = require("../../models/ClubModel");

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

          const clubDetails = await Club.create(req.body);
          res.status(201).json({ success: true, club: clubDetails });
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
        break;
      case "GET":
        try {
          const data = await Club.find({});
          SuccessResponse.data = data;
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
