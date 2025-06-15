

import  express   from "express";
import { pingController } from "../../controllers/pingConroller";


const  v1router = express.Router();


v1router.get("/ping",pingController);

export default v1router;