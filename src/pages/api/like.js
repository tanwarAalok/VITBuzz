const connectDatabase = require("../../utils/db");
import { LikedReview, Review, User } from "@/models";
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

  const { liked, userId, reviewId } = req.body;

  switch (req.method) {
    case "POST":
      try {
        const user = await User.findById(userId).populate({
          path: "likedReview",
        });

        if (!user) {
          ErrorResponse.error.explanation = "User not found";
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        }
        const oldReview = await Review.findById(reviewId);

        const idx = user?.likedReview?.findIndex(
          (r) => r.review.valueOf() == reviewId
        );

        if (idx != -1) {
          if (user.likedReview[idx].liked !== liked) {
            await LikedReview.findByIdAndUpdate(user.likedReview[idx]._id, {liked: liked});
            oldReview.likes += liked ? 2 : -2;
          }
          
        } else {
          const newLike = new LikedReview({ liked });
          oldReview.likes += liked ? 1 : -1;
          newLike.review = reviewId;
          user.likedReview.push(newLike);
          await newLike.save();
        }

        await user.save();
        await oldReview.save();

        res.status(StatusCodes.CREATED).json(SuccessResponse);
      } catch (err) {
        ErrorResponse.error.explanation = err.message;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
      }
      break;
    // case "PUT":
    //   try {
    //     await Review.findByIdAndUpdate(req.body.id, req.body);
    //     res.status(StatusCodes.OK).json(SuccessResponse);
    //   } catch (err) {
    //     ErrorResponse.error.explanation = err.message;
    //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    //   }
    //   break;

    default:
      ErrorResponse.error.explanation = "Not a valid request";
      res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
      break;
  }
}
