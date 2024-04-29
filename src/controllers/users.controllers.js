import { User } from "../models/users.model.js";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { BadRequestError, UnauthorizedError } from "../errors/index.js";

const registerUser = asyncHandler(async (req, res) => {
  // create a user in the database
  const userCreated = await User.create({ ...req.body });
  // generate a unique token
  const token = await userCreated.generateJwt();
  const user = {
    userId: userCreated._id,
    username: userCreated.username,
    token: token,
  };
  // send the token to the frontend
  res
    .status(200)
    .json(
      new ApiResponse(StatusCodes.CREATED, user, "user created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  // get data from req object
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("please enter email and password");
  //check whether user already exists in the database
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new UnauthorizedError("invalid credentials");
  // check whether the password is correct
  const isPasswordCorrect = await existingUser.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthorizedError("invalid credentials");
  // generate a unique token
  const token = await existingUser.generateJwt();
  const user = {
    userId: existingUser._id,
    username: existingUser.username,
    token,
  };
  // send back the token to the frontend
  res
    .status(StatusCodes.OK)
    .send(new ApiResponse(StatusCodes.OK, user, "user logged in successfully"));
});

export { registerUser, loginUser };
