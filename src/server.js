const express = require("express");
const mongoose = require("mongoose");
const connection = require("./connection");
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

const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db("test").collection("articles");
  // perform actions on the collection object
  client.close();
});

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
