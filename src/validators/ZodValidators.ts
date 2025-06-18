import { Request, Response, NextFunction } from "express";  

import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema<any>) =>(req:Request, res: Response, next: NextFunction) => {
   
    try {
        
        schema.parse(req.body);
        // If validation passes, call next middleware
        next();
    } catch (error) {
        // If validation fails, send a 400 Bad Request response
        console.log(error);
        res.status(400).json({
          
            message: "Validation error",
          
        });
    } 
};