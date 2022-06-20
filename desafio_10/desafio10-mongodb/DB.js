const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conected to MongoDB Atlas'))
    .catch((error) => console.log(error));