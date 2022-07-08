const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const { urlencoded } = require("express");


app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(express.json());



const HomeRoute = require("./routes/homeRoute");
const Countries = require("./routes/countries");
const States = require("./routes/states");





app.use("/",HomeRoute);
app.use("/",Countries)
app.use("/",States)

app.listen(PORT, async () => {
    console.log("listening on port:" +  PORT+ "-----------------------------------------------------");
  });
  