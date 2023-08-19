import { FacultyRepository } from "../repositories";
const facultyRepository = new FacultyRepository();
import AppError from "../../utils/error/app-error";
import { StatusCodes } from "http-status-codes";

async function createFaculty(data) {
  try {
    const newFaculty = await facultyRepository.create(data);
    return newFaculty;
  } catch (error) {
    throw new AppError(
      `Something went wrong while creating new faculty - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFaculty(query) {
  try {
    const customFilters = {};
    const sortFilter = {};
    const aggregateArray = [];

    if (query.gender && query.gender !== "") {
      customFilters.gender = query.gender;
    }

    if (query.sortType && query.sortType !== "") {
      sortFilter.overallRating = parseInt(query.sortType);
    }

    aggregateArray.push({ $match: customFilters });

    if (Object.keys(sortFilter).length != 0) {
      aggregateArray.push({ $sort: sortFilter });
    }

    const allFaculty = await facultyRepository.getAll(aggregateArray);
    return allFaculty;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching all faculty - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFacultyById(id) {
  try {
    const faculty = await facultyRepository.get(id);
    return faculty;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching faculty - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateFaculty(id) {
  try {
    const faculty = await facultyRepository.update(id);
    return faculty;
  } catch (error) {
    throw new AppError(
      `Something went wrong while updating faculty - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getTopFaculty() {
  try {
    const topFaculty = await facultyRepository.getAll([
      { $sort: { overallRating: -1 } },
      { $limit: 3 },
    ]);

    return topFaculty;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching faculty - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getFacultyReviews(facultyId) {
  try {
    let response = await facultyRepository.getReviews(facultyId);
    response = {
      reviews: response.reviews,
      overallBehaviourRating: response.overallBehaviourRating,
      overallRating: response.overallRating,
      overallTeachingRating: response.overallTeachingRating,
      overallPaperRating: response.overallTeachingRating
    };
    return response;
  } catch (error) {
    throw new AppError(
      `Something went wrong while fetching faculty reviews - ${error.message}`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  getTopFaculty,
  updateFaculty,
  getFacultyReviews,
};
