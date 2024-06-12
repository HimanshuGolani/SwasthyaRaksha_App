import Prescription from "../model/Prescription.js";
import User from "../model/User.js";

export const getAllPrescriptions = async (req, res, next) => {
  let prescription;
  try {
    const id = req.params.id;

    prescription = await User.findById(id).populate("prescriptions");
  } catch (err) {
    return console.error(err);
  }
  if (!prescription) {
    return res.status(404).json({ message: "No Prescription Found" });
  }
  return res.status(200).json({ prescription });
};

export const addPrescription = async (req, res, next) => {
  const { DoctorName, HospitalName, image, prescDate, user } = req.body;
  console.log(req.body);

  try {
    let existingUser = await User.findById(user);

    if (!existingUser) {
      console.log(existingUser);

      return res.status(404).json({ message: "User not found" });
    }

    // Create a new prescription
    const prescription = new Prescription({
      DoctorName,
      HospitalName,
      image,
      prescDate,
      user, // Assuming user is the ID of the user
    });
    const saveprescription = await prescription.save();
    const updatedPrescriptions = await User.findByIdAndUpdate(
      user,
      {
        $push: { prescriptions: saveprescription },
      },
      { new: true }
    )
      .populate("prescriptions")
      .exec();

    return res.status(201).json({ updatedPrescriptions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding prescription" });
  }
};

export const updatePrescription = async (req, res, next) => {
  const { DoctorName, HospitalName, prescDate } = req.body;
  const presId = req.params.id;
  let prescription;
  try {
    prescription = await Prescription.findByIdAndUpdate(presId, {
      DoctorName,
      HospitalName,
      prescDate,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!prescription) {
    return res.status(500).json({ message: "unable to update" });
  }
  return res.status(200).json({ prescription });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let prescription;
  try {
    prescription = await Prescription.findById(id);
  } catch (err) {
    return console.error(err);
  }
  if (!prescription) {
    return res.status(500).json({ message: "No prescription found" });
  }
  return res.status(200).json({ prescription });
};

export const deletePrescription = async (req, res, next) => {
  const id = req.params.id;

  let prescription;
  try {
    prescription = await Prescription.findByIdAndDelete(id).populate(
      "prescriptions"
    );
    await prescription.user.prescriptions.pull(prescription);
    await prescription.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!prescription) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userPres;
  try {
    userPres = await User.findById(userId).populate("prescription");
  } catch (error) {
    return console.log(err);
  }
  if (!userPres) {
    return res.status(404).json({ message: "No prescription found" });
  }
  return res.status(200).json({ prescriptions: "userPres" });
};

export const fetchPrescriptionById = async (id) => {
  try {
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(404).send({ message: "Prescription not found" });
    }
    return prescription;
  } catch (error) {
    console.error(`Error occurred while fetching prescription:`, error);
    res.status(500).send({ message: "Internal server error" });
  }
};
