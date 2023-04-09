const connectDatabase = require("../../utils/db");
import NextCors from "nextjs-cors";
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
        const avgRating = (
          (paperRating + behaviourRating + teachingRating) /
          3
        ).toFixed(1);

        const ratings = {
          avgRating,
          paperRating,
          behaviourRating,
          teachingRating,
        };

        const {
          overallRating,
          overallBehaviourRating,
          overallPaperRating,
          overallTeachingRating,
          reviews,
        } = faculty;

        faculty.overallRating = (
          (overallRating * reviews.length + avgRating) /
          (reviews.length + 1)
        ).toFixed(1);
        faculty.overallBehaviourRating = (
          (overallBehaviourRating * reviews.length + overallBehaviourRating) /
          (reviews.length + 1)
        ).toFixed(1);
        faculty.overallPaperRating = (
          (overallPaperRating * reviews.length + overallPaperRating) /
          (reviews.length + 1)
        ).toFixed(1);
        faculty.overallTeachingRating = (
          (overallTeachingRating * reviews.length + overallTeachingRating) /
          (reviews.length + 1)
        ).toFixed(1);

        const body = { comment, ratings };
        const newReview = new Review(body);

        newReview.user = userId;
        faculty.reviews.push(newReview);

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
