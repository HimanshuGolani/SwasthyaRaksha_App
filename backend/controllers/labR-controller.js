import LabReport from "../model/LabReport.js";
import User from "../model/User.js";

export const getAllLabReports = async (req, res, next) => {
  try {
    const id = req.params.id;
    // Find the LabReport by its ID and populate the 'user' field with the associated user
    const labReport = await User.findById(id).populate("labReports");

    // Check if the labReport exists
    if (!labReport) {
      return res.status(404).json({ message: "Lab Report not found" });
    }

    // Return the labReport with populated 'user' field
    return res.status(200).json({ labReport });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// In addLabReport controller
export const addLabReport = async (req, res, next) => {
  const { ReportName, ReportDate, image, user } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new LabReport instance
    const labReport = new LabReport({
      ReportName,
      ReportDate,
      image,
      user, // Assuming user is the ID of the user
    });

    // Save the new LabReport instance
    const savedLabReport = await labReport.save();

    // Push the ID of the new LabReport to the 'labReports' array of the associated user
    await User.findByIdAndUpdate(
      user,
      { $push: { labReports: savedLabReport._id } },
      { new: true }
    );

    // Return the saved LabReport
    return res.status(201).json({ labReport: savedLabReport });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// In deleteLabReport controller
export const deleteLabReport = async (req, res, next) => {
  const id = req.params.id;

  try {
    // Find the LabReport by its ID and delete it
    const deletedLabReport = await LabReport.findByIdAndDelete(id);

    // Check if the LabReport exists
    if (!deletedLabReport) {
      return res.status(404).json({ message: "Lab Report not found" });
    }

    // Return success message
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const fetchLabReportById = async (id) => {
  try {
    const labReport = await LabReport.findById(id);
    if (!labReport) {
      return res.status(404).send({ message: "Lab report not found" });
    }

    console.log(labReport);

    return labReport;
  } catch (error) {
    console.error(`Error occurred while fetching lab report:`, error);
    res.status(500).send({ message: "Internal server error" });
  }
};
