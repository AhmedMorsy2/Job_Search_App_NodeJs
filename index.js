process.on("uncaughtException", (err) => {
  console.log({ error: err });
});

import express from "express";
import { AppError } from "./src/utils/appError.js";
import { globalError } from "./src/utils/globalError.js";
import { db } from "./Database/dbConnection.js";
import userRouter from "./src/Modules/Users/user.routes.js";
import compRouter from "./src/Modules/Company/company.routes.js";
import jobRouter from "./src/Modules/Jobs/job.routes.js";
import { App } from "./Database/Models/app.model.js";
const app = express();
const port = 3000;
app.use(express.json());

app.use("/auth", userRouter);
app.use("/company", compRouter);
app.use("/job", jobRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Route not found ${req.originalUrl}`, 404));
});
app.use(globalError);
process.on("unhandledRejection", (err) => {
  console.log({ error: err });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
