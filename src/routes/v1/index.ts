
import  express   from "express";


import { pingController } from "../../controllers/pingConroller";
import submissionRouter from "./submissionRoutes";


const  v1router = express.Router();

v1router.use("/submissions", submissionRouter); // Importing submission routes

v1router.get("/ping",pingController);

export default v1router;