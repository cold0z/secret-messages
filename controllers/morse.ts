import { Request, Response, NextFunction } from "express";
import { getMorseTranslation } from "../services/funtranslations.service";
var createError = require("http-errors");

const translate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req;

    const message = query.message;

    if (!message) {
      next(createError(400, "message is required"));
    } else {
      const morseTranslation = await getMorseTranslation(message);
      res.send(morseTranslation);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};

export { translate };
