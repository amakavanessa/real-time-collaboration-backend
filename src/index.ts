import express, { Express } from "express";

import db from "./db/models";
import router from "./routes";
import cors from "cors";
import errorHandler from "./middlewares/error-handler";

const app: Express = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(router);
app.use(errorHandler);

db.sequelize.sync();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + Typescript server");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port:${port}`);
// });

export default app;
