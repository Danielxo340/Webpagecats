import { registerRoutes } from "../server/routes";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API routes
registerRoutes(app);

export default app;