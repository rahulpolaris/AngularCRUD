const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000
const { v4: uuidv4 } = require('uuid');
const cookieParser = require("cookie-parser");
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const options = {
	host: 'localhost',
	port: 3306,
  user: 'testuser',
  database: 'crudemployeesdb',
  password:'Password1!'
};



;
const { urlencoded } = require("express");
const sessionStore = new MySQLStore(options);
const sessionConfigObj= {
  key:'session cookie name',
  secret: "super hard to guess string",
  cookie:{},
  resave:false,
  saveUninitialized : false,
  store:sessionStore
}



app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionConfigObj))




const HomeRoute = require("./routes/homeRoute");
const Countries = require("./routes/country_state_city/countries");
const States = require("./routes/country_state_city/states");
const Cities = require("./routes/country_state_city/cities");
const Employees = require("./routes/Employees/employees");
const SortedEmployees = require("./routes/Employees/sortedEmployees");
const FilteredEmployees = require("./routes/Employees/filteredEmployees");



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
app.use("/",FilteredEmployees)

app.listen(PORT, async () => {
    console.log("listening on port:" +  PORT+ "-----------------------------------------------------");
    // console.log(uuidv4())
    // console.log(uuidv4())
    // console.log(uuidv4())
    // console.log(uuidv4())
    // console.log(uuidv4())
  });
  