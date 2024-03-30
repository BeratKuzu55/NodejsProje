const express = require("express");
const env_variables = require('dotenv');
const database = require('./database.js');
const ogrenciRoute = require("./routes/ogrenciRoute.js");
const bolumRoute = require('./routes/bolumRoute.js');
const databaseController = require('./controllers/databaseController.js');


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));  // req.body ile bilgileri alabilmek için kullandığımız express middleware'i

app.use("*" , (req , res , next) => {
    next();
  });

database.connectDB();
database.createDatabase();
databaseController.raporZamanKontrol();

app.use('/ogrenci' , ogrenciRoute);
app.use('/bolum' , bolumRoute);

app.listen(3000 , ()=>{
    console.log("project has started at port 3000");
});

