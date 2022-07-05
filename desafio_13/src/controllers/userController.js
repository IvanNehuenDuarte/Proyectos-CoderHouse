const userCtrl = {};

const passport = require("passport");

const User = require("../models/User");

userCtrl.renderIndex = (req, res) => {
  res.render("index");
};

userCtrl.renderSignupForm = (req, res) => {
  res.render("signup", { message: req.flash("correcto") });
};

userCtrl.signup = async (req, res) => {
  const { email, password } = req.body;

  const emailUser = await User.findOne({ email: email });
  if (emailUser) {
    req.flash("correcto", "Usuario ya existente");
    res.redirect("/signup");
  } else {
    const newUser = new User({ email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("correcto", "Usuario registrado con éxito");
    res.redirect("/signin");
  }
};

userCtrl.renderSigninForm = (req, res) => {
  res.render("signin", { message: req.flash("error") });
};

userCtrl.signin = passport.authenticate("local", {
  failureRedirect: "/signin",
  successRedirect: "/",
  failureFlash: true,
});

userCtrl.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    // if you're using express-flash
    req.flash("message", "session terminated");
    res.redirect("/signin");
  });
};

module.exports = userCtrl;
