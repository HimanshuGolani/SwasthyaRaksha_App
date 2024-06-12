import mongoose from "mongoose";

const Schema = mongoose.Schema;

const presSchema = new Schema({
  DoctorName: {
    type: String,
    required: true,
  },
  HospitalName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  prescDate: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Prescription", presSchema);
