const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
import { CourseController } from '../../server/controllers';

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
          await CourseController.createCourse(req, res);
      break;
    case "GET":
          await CourseController.getAllCourses(req, res);
      break;

    default:
      res.status(400).json({ message: "Invalid request" });
      break;
  }
}
