const connectDatabase = require('../../utils/db')
import { User, Faculty, Paper, Club } from "src/server/models";
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

    await connectDatabase();

    // *********************************************************************

    switch (req.method) {
        case "GET":
            try {
                const users = await User.find();
                const faculties = await  Faculty.find();
                const clubs = await  Club.find();
                const papers = await  Paper.find();
                const body = {
                    totalUsers: users.length,
                    totalfaculties: faculties.length,
                    totalClubs: clubs.length,
                    totalPapers: papers.length,
                }
                SuccessResponse.data = body;
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
