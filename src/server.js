const express = require("express");
const mongoose = require("mongoose");
const connection = require("./src/connection.js");
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

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
