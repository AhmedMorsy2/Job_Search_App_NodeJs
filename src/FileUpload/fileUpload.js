import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import { AppError } from "../utils/appError.js";

const fileUpload = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${folderName}`);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new AppError("PDF files only", 401), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
};

export const uploadSingleFile = (fieldName, folderName) =>
  fileUpload(folderName).single(fieldName);
