import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import ordersRouter from "./routes/orders";
import genresRouter from "./routes/genres";
import listenerTagsRouter from "./routes/listenertags";
import discoverRouter from "./routes/discover";
import { configureMongoClient } from "./connection";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

configureMongoClient();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.options('*', cors())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X_BPI_CONTEXT, x-access-token');
  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/genres", genresRouter);
app.use("/listener-tags", listenerTagsRouter);
app.use("/discover", discoverRouter);

module.exports = app;
