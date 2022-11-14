const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", require("./routeur/index"));

//ATLAS-----


const monngodb_url="mongodb+srv://Raph1:Rafi12345@cluster0.hbcn3fo.mongodb.net/service_TP1?retryWrites=true&w=majority";

mongoose.connect(monngodb_url, {useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
    console.log("mongodb is connected");
}).catch((error)=>{
    console.log("mongodb not connected");
    console.log(error);
});

//ATLAS----
app.listen(PORT, console.log("Service web fonctionnel sur PORT: ", PORT));
