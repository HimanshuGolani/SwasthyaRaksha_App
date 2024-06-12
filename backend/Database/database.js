import mongoose from "mongoose";
import "dotenv/config";

const connectDataBase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to database "))
    .catch((err) => console.log(err));
};

export default connectDataBase;
