import express from "express";
import router from "./routes/authRoutes.js";
import logger from "./middleware/logger.js"
import errorHandler from "./middleware/errorHandler.js";
import 'dotenv/config';


const PORT = 5000;


const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("ROOT WORKS");
});

app.use(errorHandler);


app.listen(PORT, () => console.log("Server started"));