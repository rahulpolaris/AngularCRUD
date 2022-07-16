const express = require("express");
const SignUp = express.Router();
const path = require("path");
const connection = require("../../resources/db_connections/employeesSqlDb");
const { v4: uuidv4 } = require('uuid');


// SignUp.post("/signup",)