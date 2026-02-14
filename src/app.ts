import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { routes } from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from "fs";

export const app = express();

const openapiPath = path.resolve(__dirname, "..", "docs", "openapi.yaml");

let swaggerDocument: any = null;
if (fs.existsSync(openapiPath)) {
  try {
    swaggerDocument = YAML.load(openapiPath);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (e) {
    // ignore or log as needed
  }
}

app.use(cors());
app.use(express.json());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use("/api", routes);

app.use(errorMiddleware);
app.get("/", (req, res) => {
  res.send("Eventful API is running");
});



app.use(cors({
  origin: "https://eventful-altschool.onrender.com"
}));
