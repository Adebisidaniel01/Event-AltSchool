import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ENV } from "../../config/env";
import { AuthService } from "./auth.service";
import { User } from "../users/user.model";

export const AuthController = {
  async register(req: Request, res: Response) {
    const { email, password, role } = req.body;
    const user = await AuthService.register(email, password, role);
    res.status(201).json(user);
  },

  async login(req: Request, res: Response) {
    const tokens = await AuthService.login(
      req.body.email,
      req.body.password
    );
    res.json(tokens);
  },

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const payload = jwt.verify(
      refreshToken,
      ENV.JWT_REFRESH_SECRET
    ) as any;

    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  },
};
