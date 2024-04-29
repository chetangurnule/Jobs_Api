import jwt from "jsonwebtoken";
import { NotFoundError, UnauthorizedError } from "../errors/index.js";
import { User } from "../models/users.model.js";

const auth = async (req, res, next) => {
  try {
    // get the token from the headers
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthorizedError("Authentication invalid");
    }
    // get the token and verify it with the database data
    const token = authHeader.split(" ")[1];
    if (!token) throw new NotFoundError("no token found");
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById(decodedToken.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid access token");
  }
};

export { auth };
