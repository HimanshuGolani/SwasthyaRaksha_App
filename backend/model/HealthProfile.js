import mongoose from "mongoose";

const healthProfileSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
  phoneNumber: Number,
  email: String,
  heartDisease: Boolean,
  hypertension: Boolean,
  allergies: [String],
  diabetes: { type: String, enum: ["Yes", "No"] },
});

export default mongoose.model("HealthProfile", healthProfileSchema);
