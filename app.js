const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');

const ejs = require('ejs');

const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageControllers');

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
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

//routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
});
