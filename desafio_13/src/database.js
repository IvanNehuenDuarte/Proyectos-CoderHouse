const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then((db) => console.log("Database is conected"))
  .catch((err) => console.log(err));

