import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../users/user.model";
import { ENV } from "../../config/env";

export const AuthService = {
  async register(email: string, password: string, role: string) {
    const hashed = await bcrypt.hash(password, 10);
    return User.create({ email, password: hashed, role });
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    if (!user.password) {
  throw new Error("User password not found");
}

const match = await bcrypt.compare(password, user.password);


    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      ENV.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  }
};
