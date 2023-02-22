import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { SearchQueryParams } from "../constants";

/*
 * Checks query params validility
 */

const checkParams = (req: Request, _res: Response, next: NextFunction) => {
  Object.keys(req.query).forEach((p) => {
    if (!SearchQueryParams[p]) {
      throw new BadRequest(`invalid query parameter: ${p}`);
    }
  });
  next();
};

export { checkParams };
