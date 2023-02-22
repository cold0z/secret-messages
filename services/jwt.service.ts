require('dotenv');

import jwt from "jsonwebtoken";
import { SHARED_SECRET_KEY, EXPIRES_IN } from "../constants";
var createError = require("http-errors");

let sharedSecret: string;

class JWTService {
  createInternalToken(data: any) {
    return jwt.sign(data, sharedSecret, { expiresIn: EXPIRES_IN });
  }
  verifySharedToken(token: string) {
    try {
      const data: any = jwt.verify(token, sharedSecret);
      if (data.id) {
        return data;
      }
      return {
        id: data.user.id,
        name: data.user.name,
      };
    } catch (error: any) {
      throw createError(500, error.message);
    }
  }

  async initJWT() {
    try {
      /*sharedSecret = (await SecretManager.getSecret(
        SHARED_SECRET_KEY
      )) as string;*/

      sharedSecret = process.env.SHAREDSECRET as string;

      if (sharedSecret === null) {
        console.log(SHARED_SECRET_KEY + " empty or not ready ");
      } else {
        console.log("[JWT] Shared secret ready");
      }
    } catch (error) {
      throw error;
    }
  }
}

const jwtService = new JWTService();

module.exports = jwtService;
