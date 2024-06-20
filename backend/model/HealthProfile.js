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
  whoViewdAndWhen: {
    type: Map,
    of: {
      userID: String,
      name: String,
      email: String,
      viewedDate: {
        type: [Date],
        default: [],
      },
    },
  },
});

export default mongoose.model("HealthProfile", healthProfileSchema);
