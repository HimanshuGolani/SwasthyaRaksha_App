import express from "express";
import {
  getHealthProfile,
  createHealthProfile,
} from "../controllers/HealthProfile-controller.js";

const HealthPRouter = express.Router();

HealthPRouter.get("/:userId", getHealthProfile);
HealthPRouter.post("/create", createHealthProfile);

export default HealthPRouter;
