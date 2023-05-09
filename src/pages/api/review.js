const connectDatabase = require("../../utils/db");
import { Faculty, Review, User } from "@/models";
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

  const {
    paperRating,
    behaviourRating,
    teachingRating,
    userData,
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
          (overallBehaviourRating * reviews.length + behaviourRating) /
          (reviews.length + 1)
        ).toFixed(1);
        faculty.overallPaperRating = (
          (overallPaperRating * reviews.length + paperRating) /
          (reviews.length + 1)
        ).toFixed(1);
        faculty.overallTeachingRating = (
          (overallTeachingRating * reviews.length + teachingRating) /
          (reviews.length + 1)
        ).toFixed(1);

        const body = { comment, ratings };
        const newReview = new Review(body);

        const userEmail = userData.email;
        let user = await User.findOne({ userEmail });
        if (!user) {
          user = await User.create(userData);
        }

        newReview.user = user._id;
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
    case "PUT":
      try {
        await Review.findByIdAndUpdate(req.body.id, req.body);
        res
          .status(400)
          .json({
            success: true,
            message: "Review updated successfully !",
          });
      } catch (err) {
        res.status(400).json({ success: false, error: err.message });
      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid request" });
      break;
  }
}
