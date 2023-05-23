const connectDatabase = require("../../utils/db");
import { Faculty, Review, User } from "@/models";
import { ErrorResponse, SuccessResponse } from "@/utils/common";
import { StatusCodes } from "http-status-codes";
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
        let user = await User.findOne({ email: userEmail });
        if (!user) {
          user = await User.create(userData);
        }

        newReview.user = user._id;
        faculty.reviews.push(newReview);

        await newReview.save();
        await faculty.save();

        res.status(StatusCodes.CREATED).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }
      break;
    case "GET":
      try {
        const faculty = await Faculty.findById(req.query.id).populate({
          path: "reviews",
          populate: {
            path: "user",
          },
        });

        SuccessResponse.data = faculty.reviews;
        res.status(StatusCodes.OK).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }
      break;

    default:
      ErrorResponse.error.explanation = "Not a valid request";
      res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      break;
  }
}
