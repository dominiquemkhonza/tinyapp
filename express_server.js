// Coding a TinyUrl mini clone ˏˋ°•*⁀➷

// express
const express = require("express");
const app = express();

// default port
const PORT = 8080; 
const bodyParser = require("body-parser");

// ejs
app.set("view engine", "ejs");

// middleware // body parser // cookies
// body parser
app.use(bodyParser.urlencoded({extended: true}));

//cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// data objects ˏˋ°•*⁀➷

const urlDatabase = {
  b2xVn2:"http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

// user database
const users = {};



// routes 
app.get("/", (req, res) => {
  res.redirect('/urls');
});

// add additional endpoints
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase, username: req.cookies["username"] };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
    let shortURL = req.params.shortURL;
    let longURL = urlDatabase[shortURL].longURL;
    
    const templateVars = { shortURL, longURL };
  res.render("urls_show", templateVars);
});


app.get("/urls/:shortURL", (req, res) => {
  const longUrl = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

// route to login page
app.get("/login", (req, res) => {
  const templateVars = {
    user: users[req.cookies["username"]]
  };
  res.render("/urls", templateVars);
  res.redirect("/login");
});


// handle POST request to login
app.post("/login",(req, res) => {
  let username = req.body.username;
  res.cookie("username", user.username);
  res.redirect("/urls");

});

// route to remove a URL resource 

app.post('/urls/:shortURL/delete', (req, res) => { 

  delete urlDatabase[req.params.shortURL];
    res.redirect('/urls');
});

// update URL resource

app.post('/urls/:id', (req, res) => {
  let shortURL = req.params.id;
  console.log(req.body);
  console.log(req.body.newLongURL);
  let newLongURL = req.body.newLongURL;
  urlDatabase[shortURL] = newLongURL;
  res.redirect('/urls');


});

// logout

app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/urls");
});

// generate random string and add it to the database
app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();

  // shortURL/longURL key value pair saved to urlDatabase
  urlDatabase[shortURL] = { shortURL, longURL }
  // any requests to shortURL -> longURL
  
  res.redirect(`/urls/${shortURL}`);  
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

// function to generate random string

function generateRandomString() {
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    let asciiCode = Math.floor(Math.random() * 26) + 97;
    randomString += String.fromCharCode(asciiCode);
  }
  return randomString;
};