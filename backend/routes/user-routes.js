import express from "express";
import {
  getAllUsers,
  login,
  signup,
  searchUser,
  setAccessToInfo,
  removeAccessToInfo,
  fetchAccessUersDetails,
  fetchAccesForData,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
// search functionality
router.get("/searchUser", searchUser);
// add access to the info of the user to another user
router.post("/addAccess/", setAccessToInfo);
// to remove the user form the access
router.put("/removeAccess", removeAccessToInfo);

router.get("/getAccessUsersInfo", fetchAccessUersDetails);

router.get("/getAccessForData", fetchAccesForData);

export default router;
