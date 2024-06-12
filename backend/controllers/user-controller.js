import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import {fetchPrescriptionById} from './pres-controller.js';
import {fetchLabReportById} from './labR-controller.js';

// Controller to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    // Find all users
    const users = await User.find();

    // If no users found, return 404 status with message
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: 'No users found',
      });
    }

    // Return users with 200 status
    return res.status(200).json({users});
  } catch (err) {
    // If error occurs, log error and return 500 status with message
    console.error(err);
    return res.status(500).json({
      message: 'An error occurred while fetching users',
    });
  }
};

// Controller to sign up a new user
export const signup = async (req, res, next) => {
  const {role, name, email, password} = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10); // Specify the number of salt rounds

    // Create new user object
    const user = new User({
      role,
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Return newly created user with 201 status
    return res.status(201).json({user});
  } catch (err) {
    // If error occurs, log error and return 500 status with message
    console.error(err);
    return res.status(500).json({
      message: 'An error occurred while signing up',
    });
  }
};

// Controller to log in an existing user
export const login = async (req, res, next) => {
  const {email, password} = req.body;
  console.log(email, password);
  try {
    // Find user by email
    const existingUser = await User.findOne({email});

    // If user not found, return 404 status with message
    if (!existingUser) {
      return res.status(404).json({message: 'User not found'});
    }

    // Compare passwords
    const ispasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password,
    );

    // If password is incorrect, return 400 status with message
    if (!ispasswordCorrect) {
      return res.status(400).json({message: 'Incorrect password'});
    }

    const userToSend = existingUser;
    userToSend.password = null;

    // If login successful, return 200 status with message and user ID
    return res.status(200).json({
      message: 'Login successful',
      id: existingUser._id,
      userData: userToSend,
    });
  } catch (err) {
    // If error occurs, log error and return 500 status with message
    console.error(err);
    return res.status(500).json({
      message: 'An error occurred while logging in',
    });
  }
};

export const searchUser = async (req, res) => {
  const {userId} = req.query;
  const currentUser = await User.findById(userId);
  // console.log(`userId , currentUser._id`, userId, currentUser);
  const reqUser = req.query.search
    ? {
        _id: {$ne: currentUser},
        $or: [
          {name: {$regex: req.query.search, $options: 'i'}},
          {email: {$regex: req.query.search, $options: 'i'}},
        ],
      }
    : {_id: {$ne: currentUser._id}};

  const users = await User.find(
    {...reqUser},
    {name: 1, email: 1, _id: 1, healthProfile: 1},
  );
  res.send(users);
};

export const setAccessToInfo = async (req, res) => {
  const {userId, accessTo} = req.query;
  try {
    // Find the user by userId
    const currUser = await User.findByIdAndUpdate(
      userId,
      {$addToSet: {accessTo: accessTo}},
      {new: true},
    );
    const accessToUser = await User.findByIdAndUpdate(
      accessTo,
      {$addToSet: {accessFor: userId}},
      {new: true},
    );

    if (!currUser) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json(currUser);
  } catch (error) {
    console.error('Error updating accessTo:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};

export const removeAccessToInfo = async (req, res) => {
  const {userId, accessTo} = req.query;
  try {
    // Find the user by userId
    const currUser = await User.findByIdAndUpdate(
      userId,
      {$pull: {accessTo: accessTo}},
      {new: true},
    );
    const accessToUser = await User.findByIdAndUpdate(
      accessTo,
      {$pull: {accessFor: userId}},
      {new: true},
    );

    if (!currUser) {
      return res.status(404).json({error: 'User not found'});
    }

    res.status(200).json(currUser);
  } catch (error) {
    console.error('Error updating accessTo:', error);
    res.status(500).json({error: 'Error removing access'});
  }
};

// we will send back the array of objects that will have the name , email of the users

export const fetchAccessUersDetails = async (req, res) => {
  const {userId} = req.query;

  // Find the user based on userId
  const findUser = await User.findById(userId);

  // If user not found, send 404 response
  if (!findUser) {
    return res.status(404).send({message: 'The user details not found'});
  }

  // Extract accessTo array from the found user
  const {accessTo} = findUser;

  // Create an empty array to store user details
  let userDetails = [];

  for (const id of accessTo) {
    const fetchUser = await User.findById(id);

    if (!fetchUser) {
      continue;
    }

    const {_id, name, email} = fetchUser;
    userDetails.push({_id, name, email});
  }

  // Send userDetails array in the response
  res.send(userDetails);
};

export const fetchAccesForData = async (req, res) => {
  const {userId} = req.query;
  try {
    const findUser = await User.findById(userId);

    if (!findUser) {
      return res.status(404).send({message: 'User not found'});
    }

    const listOfIds = findUser.accessFor;
    const dataList = [];

    for (const id of listOfIds) {
      const udata = await User.findById(id);
      if (!udata) {
        console.log(`User with ID ${id} not found`);
        continue;
      }

      const {_id, name, email, prescriptions, labReports} = udata;

      const allPrescD = [];

      for (const id of prescriptions) {
        const presc = await fetchPrescriptionById(id);
        allPrescD.push(presc);
      }

      const allLabR = [];

      for (const id of labReports) {
        const labrc = await fetchLabReportById(id);
        allLabR.push(labrc);
      }

      dataList.push({_id, name, email, allPrescD, allLabR});
    }

    res.send(dataList);
  } catch (error) {
    console.error(`Error occurred while fetching user data:`, error);
    res.status(500).send({message: 'Internal server error'});
  }
};
