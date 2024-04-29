import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      minlength: 1,
      maxlength: 60,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (obtainedPassword) {
  return await bcryptjs.compare(obtainedPassword, this.password);
};

userSchema.methods.generateJwt = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.PRIVATE_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
