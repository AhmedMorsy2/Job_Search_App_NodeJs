import mongoose from "mongoose";

export const db = mongoose
  .connect("mongodb://localhost:27017/Exam")
  .then(() => {
    console.log("DataBase Connection Successfully");
  });
