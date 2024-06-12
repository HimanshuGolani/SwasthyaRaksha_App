import express from "express";

import {
  getAllLabReports,
  addLabReport,
  deleteLabReport,
} from "../controllers/labR-controller.js";

const labRrouter = express.Router();

labRrouter.get("/:id", getAllLabReports);
labRrouter.post("/add", addLabReport);
labRrouter.delete("/deleteLabR/:id", deleteLabReport);

export default labRrouter;
