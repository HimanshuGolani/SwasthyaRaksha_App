import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  email: String,
  hospitalName: String,
  doctorName: String,
  reasonForVisit: String,
  appointmentDate: String,
});

export default mongoose.model("Appointments", AppointmentSchema);
