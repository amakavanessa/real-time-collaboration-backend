"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./db/models"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const error_handler_1 = __importDefault(require("./middlewares/error-handler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(routes_1.default);
app.use(error_handler_1.default);
models_1.default.sequelize.sync();
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + Typescript server");
// });
// app.listen(port, () => {
//   console.log(`Server is listening on port:${port}`);
// });
exports.default = app;
