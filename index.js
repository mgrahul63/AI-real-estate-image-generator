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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// run mongodb
dbConnect();

app.post("/api/v1/test", (req, res) => {
  console.log(req.body);
  console.log("calling...");
  return res.status(200).json({
    success: true,
    data: "I'm ok!",
  });
});

// open ai api routes
app.use("/api/v1/openai", openAiRoutes);

// properties routes
app.use("/api/v1/properties", propertiesRoutes);

// default get route
app.get("/api/v1", (req, res) => {
  res.send("AI Real Estate Image Generator server is running");
});

app.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`),
);
