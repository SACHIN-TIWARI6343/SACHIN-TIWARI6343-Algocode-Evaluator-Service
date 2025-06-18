
import {  Request,Response} from "express";
import { CreateSubmissionDto } from "../dtos/CreateSubmission";


export const addSubmission = (req: Request, res: Response) => {
    const submissionDto = req.body as CreateSubmissionDto;

    console.log(submissionDto);
    // TODO :ADD VALIDATION LOGIC HERE
    res.status(201).json({
        message: "Submission collected the summision ",
        error : {},
        data: submissionDto,
    });
};