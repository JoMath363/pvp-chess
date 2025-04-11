import express from "express";
import dotenv from "dotenv";
import testChess from "./testChess.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

testChess();

/* app.listen(port, () => {
   console.log(`listening on http://localhost:${port}`);
});

app.get("/", (req, res) => {
   res.send("PVP CHESS API");
}); */

