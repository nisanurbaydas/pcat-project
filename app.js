const express = require('express');
const path = require('path');

const app = express();

//template engine
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//url'deki datayı okumamızı sağlar
app.use(express.json());
//url'deki datayı json fromatına dönüştürmemizi sağlar

//routes
app.get('/', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', (req,res) => {
  console.log(req.body);
  res.redirect('/');
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sever is running on port: ${port}`);
});
