
import jwt from "jsonwebtoken";
import { defaultValidSessionTime, jwtSecretKey, sessionTimeout } from "./utils";

const userId = 'a3dwjowi1996096';

const sessionId = jwt.sign({ userId, exp: Number(sessionTimeout()) / 1000}, jwtSecretKey, { algorithm: 'HS512' });

console.log(sessionId);

console.log(jwt.verify(sessionId, jwtSecretKey));