const connectDatabase = require("../../../utils/db");
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

  const { email } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const faculty = await Faculty.findOne({ email });
        if (faculty) return res.status(400).send("Faculty already exists");

        const facultyDetails = await Faculty.create(req.body);
        res.status(201).json({ success: true, faculty: facultyDetails });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;
    
    case "GET":
      try {
        const data = await Faculty.find({});
        res.status(400).json({ success: true, faculty: data });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
