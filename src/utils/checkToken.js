import { AppError } from "./appError.js";
import jwt from "jsonwebtoken";
import { catchError } from "./catchError.js";

export const checkToken = catchError(async (req, res, next) => {
  let [key, token] = req.headers.token.split(" ");
  jwt.verify(token, "Morsy", async (err, decode) => {
    if (err) return next(new AppError("Unauthorized ", 401));
    else {
      req.user = decode;
      next();
    }
  });
});
