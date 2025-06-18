

import  express   from "express";

import { addSubmission } from "../../controllers/submissionControler";
import { validate } from "../../validators/ZodValidators";
import{ createSubmissionZodSchema } from "../../dtos/CreateSubmission";


const  submissionRouter = express.Router();


submissionRouter.post("/",validate(createSubmissionZodSchema),addSubmission);

export default submissionRouter;