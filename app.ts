import express, { Request, Response, NextFunction, response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import console from "console";
import { translate } from "./controllers/morse";
import { checkParams } from "./middlewares/checkParams";
import { verifyAuth } from "./middlewares/auth";
import { sendMessage } from "./controllers/sender";
import { agentList } from "./controllers/agent";

const Jwt = require("./services/jwt.service");
const app: express.Application = express();

Promise.all([Jwt.initJWT()]).then(() => {
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.set("view engine", "pug");

  // GENERATED CODE JWT
  app.get("/tokengenerator", generateTestToken);

  app.get("/morse", checkParams, verifyAuth, translate);
  app.post("/send", checkParams, verifyAuth, sendMessage);
  app.get("/agents", verifyAuth, agentList);

  async function generateTestToken(req, res) {
    // console.log("NODE_ENV==>", NODE_ENV);
    const usr1 = { user: { id: "7", name: "John" } };
    const tokenTest = Jwt.createInternalToken(usr1);
    console.log(
      "http://localhost:8081/oauth/begin?token=" + tokenTest + "&origin=test"
    );
    res.send(
      "<h2 style='font-family: arial'>YOUR TEST JWT</h2><p style='font-family: arial'>to be used in local env if you havent a working Courier test plateform providing valid token</p><p><b>" +
        tokenTest
    );
  }
  // ============ /TEST ONLY =============

  app.use(function (_req, res, next) {
    res.set("Cache-control", "no-cache");
    next();
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500).send(err.message);
  });

  const port = process.env.PORT || 8081;
  if (!module.parent) {
    app.listen(port, () => {
      console.log(`Secret Message Backend : listening on port ${port}`);
    });
  }
});

module.exports = app;
