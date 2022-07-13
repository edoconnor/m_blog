const express = require("express");
const mongoose = require("mongoose");
const Article = require("../models/article");
const articleRouter = require("../routes/articles");
const methodOverride = require("method-override");
require("dotenv").config();
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MonogoDB");
});

app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
