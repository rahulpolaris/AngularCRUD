const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000
;
const { urlencoded } = require("express");


app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(express.json());



const HomeRoute = require("./routes/homeRoute");
const Countries = require("./routes/country_state_city/countries");
const States = require("./routes/country_state_city/states");
const Cities = require("./routes/country_state_city/cities");
const Employees = require("./routes/Employees/employees");
const SortedEmployees = require("./routes/Employees/sortedEmployees");



app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

 next()
})

app.use("/",HomeRoute);
app.use("/",Countries)
app.use("/",States)
app.use("/",Cities)
app.use("/",Employees)
app.use("/",SortedEmployees)

app.listen(PORT, async () => {
    console.log("listening on port:" +  PORT+ "-----------------------------------------------------");
  });
  