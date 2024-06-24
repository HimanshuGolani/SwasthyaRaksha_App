import express from "express";
import {
  createAppointments,
  getAppointments,
} from "../controllers/AppoinmentsController.js";

const AppointmentsRouter = express.Router();

AppointmentsRouter.get("/:id", getAppointments);
AppointmentsRouter.post("/create", createAppointments);

export default AppointmentsRouter;
