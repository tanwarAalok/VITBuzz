const connectDatabase = require("../../../utils/db");
import NextCors from "nextjs-cors";
const Faculty = require("../../../models/FacultyModel");

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
          }
        });
        res.status(200).json({ success: true, data: faculty });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
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
        res.status(200).json({ success: true, faculty });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }

    case "DELETE":
      try {
        const blog = await Faculty.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({ success: true, message: "Faculty deleted successfully" });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }

    default:
      res.status(400).json({ success: false, message: "Default request" });
      break;
  }
}
