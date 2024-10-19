import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

export const requestAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  var token: string | undefined | string[] = req.headers.token
  if (token) {
    token = token.toString().split(' ')[1];

    const user = await User.findOne({
        token: token,
        deleted: false,
    }).select("-password");

    if (user) {
        req.user = user;
    }
  }
  next()
};