import{ Response } from "express";


export const pingController = (_req: any, res: Response) => {
    res.status(200).json({
        message: "pong",
        timestamp: new Date().toISOString()
    });
};