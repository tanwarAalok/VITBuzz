const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
const User = require("../../models/UserModel");
const Faculty = require("../../models/FacultyModel");
const Review = require("../../models/ReviewModel");

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  connectDatabase();

  // *********************************************************************

  const {
    paperRating,
    behaviourRating,
    teachingRating,
    userId,
    facultyId,
    comment,
  } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const faculty = await Faculty.findById(facultyId);
        const avgRating = (paperRating + behaviourRating + teachingRating) / 3;
        const ratings = {
          avgRating,
          paperRating,
          behaviourRating,
          teachingRating,
        };
        const body = { comment, ratings };
        const newReview = new Review(body);

        newReview.user = userId;
        faculty.reviews.push(newReview);

        if (faculty.reviews.length === 1) {
          faculty.overallRating = avgRating;
        } else {
          faculty.overallRating = (faculty.overallRating * (faculty.reviews.length - 1)) / faculty.reviews.length;
        }

        await newReview.save();
        await faculty.save();

        res
          .status(201)
          .json({ success: true, data: "Review created successfully" });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;
    // case "GET":
    //   try {
    //     const users = await Faculty.find({});
    //     res.status(400).json({ success: true, data: users });
    //   } catch (err) {
    //     res.status(400).json({ success: false, error: err.message });
    //   }
    //   break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
