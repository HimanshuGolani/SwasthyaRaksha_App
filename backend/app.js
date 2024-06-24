import express from "express";
import router from "./routes/user-routes.js";
import presRouter from "./routes/pres-routes.js";
import connectDataBase from "./Database/database.js";
import labRrouter from "./routes/labR-routes.js";
import HealthPRouter from "./routes/HealthP-router.js";
import AppointmentsRouter from "./routes/Appoinments-router.js";
import cors from "cors";
import "dotenv/config";

const app = express();

// Using middleware
app.use(express.json());
app.use(cors());

// Setting routes
app.use("/api/user", router);
app.use("/api/prescription", presRouter);
app.use("/api/labR", labRrouter);
app.use("/api/healthprofiles", HealthPRouter);
app.use("/api/appointments", AppointmentsRouter);

// Connecting to DB
connectDataBase();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running");
});
