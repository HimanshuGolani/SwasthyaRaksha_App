import mongoose from "mongoose";

const Schema = mongoose.Schema;

const labRSchema = new Schema({
  ReportName: {
    type: String,
    required: true,
  },
  ReportDate: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("LabReport", labRSchema);
