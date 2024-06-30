//app.ts
import express from "express";

import cors from "cors";
import router from "./app/routes/index.js";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:9000",
      "http://nazmus-sakib.me",
      "https://www.nazmus-sakib.me",
      "http://ns-sheam-portfolio-dashboard.netlify.app",
      "https://ns-sheam-portfolio-dashboard.netlify.app",
    ],
    credentials: true,
  })
);

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

export default app;
