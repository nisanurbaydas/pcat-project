const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const Photo = require('./models/Photo');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
//url'deki datayı okumamızı sağlar

app.use(express.json());
//url'deki datayı json fromatına dönüştürmemizi sağlar

app.use(fileUpload());

//routes
app.get('/', async (req, res) => {
  //it'll sort the posts from new to old
  const photos = await Photo.find({}).sort('-createdAt');

  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  //res.render('about');
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {

  
  const uploadDir = 'public/uploads';
  //if the file (that we want to store our uploaded image) doesn't exist create one
  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  //the image that we uploaded
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadImage.name;

  //move the uploaded images to the file that we want
  uploadImage.mv(
    uploadPath,

    //send the image to the db
    async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadImage.name,
      });
      res.redirect('/');
    }
  );
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
});
