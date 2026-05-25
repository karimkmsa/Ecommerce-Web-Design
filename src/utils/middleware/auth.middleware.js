import jwt from "jsonwebtoken";
import userModel from "../../../dataBase/models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    req.user = user || null;

    next();

  } catch (err) {
    req.user = null;
    next();
  }
};