const express = require("express");
const mongoose = require('mongoose')
const Article = require('./models/article')
const connection = require("./connection");
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const path = require('path');
const truncate = require('truncate')
const app = express();

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://eddie:jamestown@cluster0.swuan.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
  })

app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });