if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require("express");
const cors  = require("cors");
const exercisesRoute = require("./routes/exercises");
const usersRoute = require("./routes/users");
const mongoose = require("mongoose");

mongoose.connect(process.env.URI , { useNewUrlParser: true , useUnifiedTopology: true  , useCreateIndex: true });
mongoose.Promise= global.Promise;

const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDB connection error: '));
db.once('open',()=>{
    console.log("MongoDB connection established successfully");
})

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/exercises' , exercisesRoute);
app.use('/users' , usersRoute);

app.listen(port , ()=>{
    console.log(`Server is running successfully on port ${port}`);
})