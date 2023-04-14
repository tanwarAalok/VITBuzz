const connectDatabase = require("../../utils/db");
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
        //   const club = await Club.findOne({ email });
        //   if (faculty) return res.status(400).send("Faculty already exists");

          const clubDetails = await Club.create(req.body);
          res.status(201).json({ success: true, club: clubDetails });
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
        break;
      case "GET":
        try {
          const data = await Club.find({});
          res.status(400).json({ success: true, club: data });
        } catch (err) {
          res.status(400).json({ success: false, error: err.message });
        }
        break;

      default:
        res.status(400).json({ success: false, message: "Default request" });
        break;
    }
}
