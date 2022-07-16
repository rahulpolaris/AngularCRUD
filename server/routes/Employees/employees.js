const express = require("express");
const Employees = express.Router();
const path = require("path");
const connection = require("../../resources/db_connections/employeesSqlDb");
const { v4: uuidv4 } = require('uuid');

Employees.get("/employees", async (req, res) => {
  connection.query(`SELECT * FROM employees `, (err, results, fields) => {
    if (!err) {
      res.status(200).json(results);
    } else {
      console.log(err);
      res.send("sorry something went wrong! Please Check Console");
    }
  });
});

Employees.post("/employees", async (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  const emp_id = uuidv4()

  if (!req.body.password)
  {

      const {
        firstname,
        lastname,
        email,
        phone,
        date_of_birth,
        country,
        state,
        city,
      } = req.body;
      let dob  = date_of_birth
      if (date_of_birth.length === 0)
      {
        dob = null
      }
      else
      {
        dob = `'${date_of_birth}'`
      }
    
      connection.query(
        `INSERT INTO employees (emp_id,firstname,lastname,email,phone,date_of_birth,country,state,city) VALUES ( '${emp_id}','${firstname}', '${lastname}', '${email}', '${phone}', ${dob},  '${country}', '${state}', '${city}');INSERT INTO employees_passwords (password,employee_id) VALUES ('!Password123','${emp_id}');`,
        (err, results, fields) => {
          if (!err) {
            res.status(200).json(results);
            //  results should be like this
            //  {
            //     "fieldCount": 0,
            //     "affectedRows": 1,
            //     "insertId": 3,
            //     "info": "",
            //     "serverStatus": 2,
            //     "warningStatus": 0
            // }
          } else {
            console.log(err);
            res.send("sorry something went wrong! Please Check Console");
          }
        }
      );
  }
  else
  {
    const {firstname,lastname,email,phone,password} = req.body
    connection.promise().query(`select * from employees where email = '${email}'`).then(([results,fields])=>{
        console.log("Here are the results",results)
        if(results.length === 0)
        {
            connection.query(
                `INSERT INTO employees (emp_id,firstname,lastname,email,phone) VALUES ( '${emp_id}','${firstname}', '${lastname}', '${email}', '${phone}');INSERT INTO employees_passwords (password,employee_id) VALUES ('${password}','${emp_id}');`,
                (err, results, fields) => {
                  if (!err) {
                    res.status(200).json(results);
                  } else {
                    console.log(err);
                    res.send("sorry something went wrong! Please Check Console");
                  }
                }
              );    
        

        }
        else
        {
            res.json({emailExists:true})
        }
    }).catch(err=>{
        if(err){
            console.log(err)
        }
    })


  }

  // res.status(200).json({sent:"Successful"})
});
Employees.delete("/employees/:id", async (req, res) => {
  console.log(req.params);
  // res.status(200).send({deleted:"successful"})
  connection.query(
    `DELETE FROM employees WHERE employees.emp_id = '${req.params.id}'`,
    (err, results, fields) => {
      if (!err) {
        res.status(200).json(results);
      } else {
        console.log(err);
        res.send("sorry something went wrong! Please Check Console");
      }
    }
  );
});
Employees.put("/employees/:id", async (req, res) => {
  console.log(req.body);
  console.log(req.headers);

  const params_id = req.params.id;
  const {
    id,
    firstname,
    lastname,
    email,
    phone,
    date_of_birth,
    country,
    state,
    city,
  } = req.body;

  connection.query(
    `UPDATE employees SET firstname = '${firstname}', lastname = '${lastname}', email = '${email}', phone = '${phone}', date_of_birth = '${date_of_birth}', country = '${country}', state = '${state}', city = '${city}' WHERE emp_id = '${params_id}'`,
    (err, results, fields) => {
      if (!err) {
        res.status(200).json(results);
      } else {
        console.log(err);
        res.send("sorry something went wrong! Please Check Console");
      }
    }
  );
});
module.exports = Employees;
