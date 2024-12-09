import express from "express";
import session from "express-session";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import error from "./middlewares/error.js";
import routesTasks from "./routes/rTask.js";
import routesUsers from "./routes/rUser.js";
import { isAuthenticated } from "./middlewares/auth.js";

const __dirname = process.cwd();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(morgan("common"));
} else {
  app.use(morgan("dev"));
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public"), { maxAge: "1d" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(routesUsers);
app.use(isAuthenticated, routesTasks);
app.use(error.e404);

app.listen(port, () => {
  console.log(`La aplicación está funcionando en el puerto ${port}`);
});

process.on("uncaughtException", (err) => {
  console.error("Excepción no capturada:", err);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error(
    "Rechazo no manejado en la promesa:",
    promise,
    "Razón:",
    reason
  );
});
