const express = require('express');
const connectDB = require("./config/db");
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000 ;

app.use(express.static('public'));          // without this line you will get MIME type error.

app.use(express.json());

connectDB();

//Cors

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions));

//Template engine

app.set("views" ,path.join(__dirname, "/views") );
app.set("view engine" , "ejs");


app.use("/api/files",require('./routes/files'));

app.use("/files", require("./routes/show"));

app.use("/files/download",require("./routes/download"));


app.listen(PORT,() =>{
    console.log(`Listening on port ${PORT}`);
});