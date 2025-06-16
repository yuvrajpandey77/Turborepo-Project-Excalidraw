import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export const middleware = (req: Request, res: Response, next: NextFunction) => {

    if(!JWT_SECRET){
        throw new Error("Jwt not found!")
       }
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
        //@ts-ignore TODO fix this (update the structure of the request object in express )
        req.userId = decoded.userId;
        next();
    }
    else {
        res.status(403).json({
            message: "Unauthorised"
        })
    }
}