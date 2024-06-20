import User from '../model/User.js';
import HealthProfile from '../model/HealthProfile.js';
import mongoose from 'mongoose';

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
    {healthProfile: newHealthProfile._id},
    {new: true},
  );
  console.log(updatedUser);
  res.send(updatedUser);
};

export const getHealthProfile = async (req, res) => {
  try {
    const {userId} = req.params;

    // Find the user by ID and populate its healthProfile field
    const userWithHealthProfile = await User.findById(userId).populate(
      'healthProfile',
    );

    if (!userWithHealthProfile) {
      return res.status(404).send('User not found.');
    }

    res.status(200).json(userWithHealthProfile.healthProfile);
  } catch (error) {
    console.error('Error getting health profile:', error);
    res.status(500).send('Error getting health profile.');
  }
};

export const saveWhoViewdAndWhen = async (req, res) => {
  const {userId, name, email, healthProfileId} = req.query;

  console.log('====================================');
  console.log(userId, name, email, healthProfileId);
  console.log('====================================');

  try {
    if (!mongoose.Types.ObjectId.isValid(healthProfileId)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid healthProfileId.',
      });
    }

    const currentDateTime = new Date();
    const findHealthProfile = await HealthProfile.findById(healthProfileId);

    if (!findHealthProfile) {
      return res.status(404).send({
        success: false,
        message: 'Health profile not found.',
      });
    }

    if (!findHealthProfile.whoViewdAndWhen) {
      findHealthProfile.whoViewdAndWhen = new Map();
    }

    if (!findHealthProfile.whoViewdAndWhen.has(userId)) {
      findHealthProfile.whoViewdAndWhen.set(userId, {
        userID: userId,
        name: name,
        email: email,
        viewedDate: [currentDateTime],
      });
    } else {
      findHealthProfile.whoViewdAndWhen
        .get(userId)
        .viewedDate.push(currentDateTime);
    }

    await findHealthProfile.save();
    console.log('====================================');
    console.log(findHealthProfile.whoViewdAndWhen);
    console.log('====================================');
    return res.status(200).send({
      success: true,
      message: 'Log saved successfully.',
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error occurred.',
    });
  }
};
export const getSavedLogs = async (req, res) => {
  try {
    const {userId} = req.query;

    console.log('====================================');
    console.log(userId);
    console.log('====================================');

    const findUser = await User.findById(userId);

    const healthProfileId = findUser.healthProfile;

    const findProfileLogs = await HealthProfile.findById(healthProfileId);

    if (!findProfileLogs) {
      return res.status(404).send({
        success: false,
        message: 'Profile not found.',
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'Data sent successfully.',
        logs: findProfileLogs.whoViewdAndWhen,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: 'Error occurred.',
    });
  }
};
