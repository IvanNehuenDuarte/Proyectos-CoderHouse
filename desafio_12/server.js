const express = require("express");
const session = require("express-session");
const path = require("path");

const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Initializations
const app = express();

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://ivoGD:narutoshippuden1@mongo-session.0ytkk.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),

    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
  })
);

// Settings
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


function logout(req, res, next) {
  if (!req.session.user) {
    res.redirect('register')
  }
  return next()
};

// Métodos HTTP
app.get('/', (req, res) => {
    res.render('index')
})

app.get("/register", (req, res) => {
  res.render("register");
});

app.get('/productos', logout, (req, res) => {
    user = req.session.user
    res.render('productos', { user });
});

app.post('/register', (req, res) => {
    const userName = req.body
    req.session.user = userName

    req.session.save(err => {
        if(err){
            console.log(err);
        } else {
            res.redirect('productos')
        }
    });
    
    console.log(req.session);
});

app.get('/logout', (req, res) => {
    user = req.session.user
    res.render('logout', { user })

    req.session.destroy( error =>{
        if (error) {
            res.send({ status: "Logout Error", body: error })
        }
    })
});

// Server Listenning
app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log(
    `Servidor escuchando en el puerto: http://localhost:${app.get("port")}`
  );
});

server.on("error", (error) => console.log(`Error del servidor ${error}`));
