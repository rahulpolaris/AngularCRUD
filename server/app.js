const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000
const { v4: uuidv4 } = require('uuid');
const cookieParser = require("cookie-parser");
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const cors =require('cors')
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
  cookie:{maxAge:1000*3600},
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
const User = require("./routes/Employees/user");
const UploadedFiles = require("./routes/Employees/uploadFiles")

let whitelist = ['http://localhost:4200','http://localhost:80','http://localhost:5000'];
        let corsOptions = {
            origin: true,credentials: true,
            methods:'GET,PUT,POST,DELETE',
            allowedHeaders:'Content-Type,Authorization,X-Requested-With'
        }



// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//  next()
// })
app.use(cors(corsOptions))

app.use("/",HomeRoute);
app.use("/",Countries)
app.use("/",States)
app.use("/",Cities)
app.use("/",Employees)
app.use("/",SortedEmployees)
app.use("/",FilteredEmployees)
app.use("/",User)
app.use("/",UploadedFiles)

app.listen(PORT, async () => {
    console.log("listening on port:" +  PORT+ "-----------------------------------------------------");
    // console.log(uuidv4())
    // console.log(uuidv4())
    // console.log(uuidv4())
    // console.log(uuidv4())
    // console.log(uuidv4())
  });
  