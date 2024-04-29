import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection error: " + error);
    process.exit(1); // it tells nodejs to stop server if any error ocurred in connection to the mongodb
  }
};

export { dbConnection };
