const { Faculty, Review, LikedReview } = require("@/server/models");
const UserService = require('./user-service')
const FacultyService = require("./faculty-service");
const AppError = require("@/utils/error/app-error");
const { StatusCodes } = require("http-status-codes");

async function createFacultyReview(data, facultyId) {
  try {
    const faculty = await Faculty.findById(facultyId);

    const {
      comment,
      avgRating,
      paperRating,
      behaviourRating,
      teachingRating,
      userData,
    } = data;

    const ratings = { avgRating, paperRating, behaviourRating, teachingRating };

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

    let user = await UserService.getUserByEmail(userData.email);
    if (!user) {
      user = await UserService.createUser(userData);
    }

    newReview.user = user._id;
    faculty.reviews.push(newReview);

    await newReview.save();
    await faculty.save();
  } catch (error) {
    throw new AppError(
      `Something went wrong while creating new review - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFacultyReviews(facultyId) {
  try {
    const response = await FacultyService.getFacultyReviews(facultyId);
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching faculty reviews - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function voteReview({ userData, reviewId, liked }) {
  try {
    let user = await UserService.getUserByEmail(userData.email);
    if (!user) {
      user = await UserService.create(userData);
    }

    const oldReview = await Review.findById(reviewId);

    let idx = -1;
    if (user.likedReview.length > 0) {
      idx = user.likedReview.findIndex((r) => r.review.valueOf() == reviewId);
    }

    if (idx != -1) {
      if (user.likedReview[idx].liked != liked) {
        await LikedReview.findByIdAndUpdate(user.likedReview[idx]._id, {
          liked: liked,
        });

        if (liked) {
          oldReview.upvotes.push(user._id);
          oldReview.downvotes = oldReview.downvotes.filter((v) => v != user._id);
        } else {
          oldReview.downvotes.push(user._id);
          oldReview.upvotes = oldReview.downvotes.filter((v) => v != user._id);
        }
      }
    } else {
      let newVote = new LikedReview({ liked });
      if (liked) {
        oldReview.upvotes.push(user._id);
      } else {
        oldReview.downvotes.push(user._id);
      }
      newVote.review = reviewId;
      user.likedReview.push(newVote);
      await newVote.save();
    }

    await user.save();
    await oldReview.save();
  } catch (error) {
      throw new AppError(`Request failed!, ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
    createFacultyReview, 
    getFacultyReviews,
    voteReview
}