import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { userId, healthProfileId } = req.query;

  if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({ success: false, message: "Invalid UserId" });
  }
  if (healthProfileId && !mongoose.Types.ObjectId.isValid(healthProfileId)) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid HealthProfileId" });
  }
  next();
};

export default validateObjectId;
