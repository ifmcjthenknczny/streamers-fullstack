import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import { streamerRouter, streamersRouter } from "./index";

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(bodyParser.json());
app.use(express.static("build"));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/streamer", streamerRouter);
app.use("/api/streamers", streamersRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
