import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  prescriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
    },
  ],
  labReports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabReport",
    },
  ],
  healthProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HealthProfile",
  },
  role: {
    type: String,
    enum: ["Doctor", "Normal-User"],
    default: "Normal-User",
    required: true,
  },
  // AccessInfo for users that this user can access
  accessTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // AccessInfo for users that can access this user's details
  accessFor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  Appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointments",
    },
  ],
});

export default mongoose.model("User", userSchema);
