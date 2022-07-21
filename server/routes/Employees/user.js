const express = require("express");
const User = express.Router();
const path = require("path");
const connection = require("../../resources/db_connections/employeesSqlDb");
const cors = require("cors");
// const { v4: uuidv4 } = require("uuid");

let whitelist = ["http://localhost:4200", "http://localhost:80"];
let corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization,X-Requested-With",
};

User.get("/users/login", (req, res) => {
  if (req?.session?.email) {
    res
      .status(200)
      .json({ isSessionActive: true, sessionEmail: req.session.email });
  } else {
    res.status(200).json({ isSessionActive: false });
  }
  // if (err) {
  //   console.log(err);
  // }
});

// SignUp.post("/signup",)
User.post("/users/login", (req, res) => {
  console.log(req.body);
  // console.log("~~~~~~~~~~~~~~~~~");
  const { email, password: posted_password } = req.body;
  if (email !== "admin") {
    connection
      .promise()
      .query(`SELECT * from employees WHERE email = '${email}'`)
      .then(([rows, fields]) => {
        // console.log("rows are:~~~~~~~~~~~", rows);
        if (rows.length === 0) {
          res.json({ emailExists: false });
        } else {
          return rows;
        }
      })
      .then((rows) => {
        // console.log(rows);
        if (rows !== undefined) {
          connection.query(
            `SELECT * from employees_passwords WHERE employee_id = '${rows[0].emp_id}'`,
            (err, results, fields) => {
              if (!err) {
                console.log(results);
                if (posted_password === results[0].password) {
                  req.session.email = rows[0].email;
                  res
                    .status(200)
                    .json({ passwordMatch: true, emailExists: true });
                } else {
                  res
                    .status(200)
                    .json({ passwordMatch: false, emailExists: true });
                }
              } else {
                console.log(err);
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ ErrorOccured: true });
      });
  }
});

User.get("/users/:email", (req, res) => {
  const { email: params_email } = req.params;
  if (req?.session?.email) {
    if (params_email === req.session.email) {
      connection
        .promise()
        .query(`SELECT * from employees WHERE email = '${params_email}'`)
        .then(([rows, fields]) => {
          res
            .status(200)
            .json({ isUserLoggedIn: true, rows: rows, isGoodRequest: true });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "something went wrong son" });
        });
    } else {
      res.send({ isGoodRequest: false, isUserLoggedIn: false });
    }
  } else {
    res.status(200).send({ isGoodRequest: false, isUserLoggedIn: false });
  }
});
User.get("/users/:email/logout", (req, res) => {
  const { email } = req.params;
  if (req?.session?.email) {
    req.session.destroy((err) => {
      console.log(err);
      res.send({ sessionDestroyed: true });
    });
    return;
  }
});
module.exports = User;
