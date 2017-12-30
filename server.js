const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

const port = process.env.PORT || 3000;

hbs.registerHelper('curYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(msg) => {
  return msg.toUpperCase();
});
// register a middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
  });
  next();
});

// if we dont want to notice user about maintenance, will command out
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   // we dont use next here, so the following line will not be fired
// });

// exec from top to bottom
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page, please use: git-scm.com for how to use git'
    ,msg: 'welcom to my websites'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About page'
  });
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});
// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
