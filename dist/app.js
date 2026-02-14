"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = require("./routes");
const error_middleware_1 = require("./middlewares/error.middleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.app = (0, express_1.default)();
const openapiPath = path_1.default.resolve(__dirname, "..", "docs", "openapi.yaml");
let swaggerDocument = null;
if (fs_1.default.existsSync(openapiPath)) {
    try {
        swaggerDocument = yamljs_1.default.load(openapiPath);
        exports.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
    catch (e) {
        // ignore or log as needed
    }
}
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
exports.app.use("/api", routes_1.routes);
exports.app.use(error_middleware_1.errorMiddleware);
exports.app.get("/", (req, res) => {
    res.send("Eventful API is running");
});
exports.app.use((0, cors_1.default)({
    origin: "https://eventful-altschool.onrender.com"
}));
