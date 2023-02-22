import { Request, Response, NextFunction } from "express";
import { getAgent } from "../services/agent.service";
import { getCourierSender } from "../services/courier.service";
import { getMorseTranslation } from "../services/funtranslations.service";
var createError = require("http-errors");

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    const message = body.message;
    const title = body.title;
    const codeAgent = body.agent;

    console.log({body})
    const agent = await getAgent(codeAgent);

    // !we can check preference of each agent to chosse channels
    const email = agent.email; // *get email number from service and decrypt it
    const phone = agent.phone; // *get phone number from service and decrypt it

    /**
     * * enhance the api call with a validator
     */
    if (!message) {
      next(createError(400, "message is required"));
    } else {

      const courierSender = await getCourierSender(
        message,
        title,
        email,
        phone
      );
      console.log({courierSender})
      res.send(courierSender);

      
      const morseTranslation = await getMorseTranslation(message);
      if (morseTranslation.code === 200) {
        const courierSender = await getCourierSender(
          morseTranslation.message,
          title,
          email,
          phone
        );
        console.log({courierSender})
        res.send(courierSender);
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    next(error);
  }
};

export { sendMessage };
