import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

// middle ware to parse the body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1:Allow All Origins with Default of cors(*)
app.use(cors());
// option2 allow custom origin
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send(`welcome to mearn stack tutorial`);
});

// midle ware to use booksRoute
app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database successfully ");
    app.listen(PORT, () => {
      console.log("App is listening to port: http://localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
