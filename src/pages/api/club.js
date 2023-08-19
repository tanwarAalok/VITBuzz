const connectDatabase = require("../../utils/db");
import { ClubController } from "src/server/controllers";
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
        await ClubController.createClub(req, res);
        break;
      
      case "GET":
        await ClubController.getAllClubs(req, res);
        break;

      default:
        res.status(400).json({ message: "Invalid request" });
        break;
    }
}
