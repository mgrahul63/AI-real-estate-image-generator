import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import { dbConnect } from "./mongodb/mongodb.config.js";
import openAiRoutes from "./routes/openAiRoutes.js";
import propertiesRoutes from "./routes/propertiesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(json());
app.use(morgan("dev"));

// run mongodb
dbConnect();

app.post("/api/test", (req, res) => {
  return res.status(200).json({
    success: true,
    data: "I'm ok!",
  });
});

// open ai api routes
app.use("/api/openai", openAiRoutes);

// properties routes
app.use("/api/properties", propertiesRoutes);

// default get route
app.get("/api", (req, res) => {
  res.send("AI Real Estate Image Generator server is running");
});

app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`),
);
