import jwt from "jsonwebtoken";
import { ENV } from "../../src/config/env";

test("JWT should be valid", () => {
  const token = jwt.sign({ id: "1" }, ENV.JWT_SECRET);
  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  expect(decoded).toBeTruthy();
});
