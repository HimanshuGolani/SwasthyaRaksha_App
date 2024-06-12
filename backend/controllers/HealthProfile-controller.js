import User from "../model/User.js";
import HealthProfile from "../model/HealthProfile.js";

export const createHealthProfile = async (req, res) => {
  // get the data that to bde filed in the user's health profile
  const {
    userId,
    email,
    name,
    age,
    gender,
    phoneNumber,
    heartDisease,
    hypertension,
    allergies,
    diabetes,
  } = req.body;

  console.log(req.body);

  // Create a new health profile
  const newHealthProfile = new HealthProfile({
    email,
    name,
    age,
    gender,
    phoneNumber,
    heartDisease,
    hypertension,
    allergies,
    diabetes,
  });

  // Save the new health profile
  await newHealthProfile.save();

  console.log(newHealthProfile);

  // Find the user by ID and update its healthProfile field with the newly created health profile's ID
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { healthProfile: newHealthProfile._id },
    { new: true }
  );
  console.log(updatedUser);
  res.send(updatedUser);
};

export const getHealthProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by ID and populate its healthProfile field
    const userWithHealthProfile = await User.findById(userId).populate(
      "healthProfile"
    );

    if (!userWithHealthProfile) {
      return res.status(404).send("User not found.");
    }

    res.status(200).json(userWithHealthProfile.healthProfile);
  } catch (error) {
    console.error("Error getting health profile:", error);
    res.status(500).send("Error getting health profile.");
  }
};
