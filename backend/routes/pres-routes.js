import express from "express";
import {
  addPrescription,
  deletePrescription,
  getAllPrescriptions,
  getById,
  getByUserId,
  updatePrescription,
} from "../controllers/pres-controller.js";
const presRouter = express.Router();

presRouter.get("/:id", getAllPrescriptions);
presRouter.post("/add", addPrescription);
presRouter.put("/update/:id", updatePrescription);
presRouter.get("/:id", getById);
presRouter.delete("/delete/:id", deletePrescription);
presRouter.get("/user/:id", getByUserId);

export default presRouter;
