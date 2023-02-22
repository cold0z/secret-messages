import { Request, Response, NextFunction } from "express";
var createError = require("http-errors");
const Jwt = require("../services/jwt.service");

const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return next(createError(500, "Unauthorized"));
    const token = authorization.split("Bearer ")[1];
    const user = Jwt.verifySharedToken(token);

    console.log(`Request for userId:${user.id} name:${user.name}`);
    res.locals.user = user;
    next();
  } catch (error: any) {
    next(createError(500, error.message));
  }
};

export { verifyAuth };
