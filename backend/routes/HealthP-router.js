import express from "express";
import mongoose from "mongoose";
import {
  getHealthProfile,
  createHealthProfile,
  saveWhoViewdAndWhen,
  getSavedLogs,
} from "../controllers/HealthProfile-controller.js";
import validateObjectId from "../middlewares/validateObjectId.js";

const HealthPRouter = express.Router();

HealthPRouter.post("/create", createHealthProfile);
HealthPRouter.post("/whoViewdProfile", saveWhoViewdAndWhen);
HealthPRouter.get("/getProfileViewLogs", getSavedLogs);

HealthPRouter.get("/:userId", validateObjectId, getHealthProfile);

export default HealthPRouter;
