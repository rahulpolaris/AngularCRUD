const express = require("express");
const fs = require('fs')
const UploadedFiles = express.Router();
const path = require("path");
const connection = require("../../resources/db_connections/employeesSqlDb");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../resources/file_storage"),
  filename: function (req, file, cb) {
    let extensionName;
    if (file) {
      const originalFileName = file.originalname;
      const dotPos = originalFileName.lastIndexOf(".");
      extensionName = originalFileName.slice(
        -(originalFileName.length - dotPos)
      );
    }
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + extensionName;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

UploadedFiles.post("/files", upload.single("file"), (req, res) => {
  console.log("Hitting file transfer route .......................");
  if (req?.session?.email && req?.file) {
    const emp_id = req.body.emp_id;
    const file = req.file;
    connection
      .promise()
      .query(
        `INSERT INTO employee_files (type,location,size,originalname,filename,emp_id) VALUES ('${file.mimetype}', '${file.path}', ${file.size}, '${file.originalname}', '${file.filename}', '${emp_id}') `
      )
      .then(([rows, fields]) => {
        // console.log(rows);
        res.status(200).json({ fileUploaded: true, rows });
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send({ error: "Something went wrong" });
      });
  } else {
    res.status(200).send({ error: "Bad Request" });
  }
});

UploadedFiles.get("/files/:emp_id", (req, res) => {
  if (req?.session?.email) {
    const emp_id = req.params.emp_id;
    // const responseObj = { session: true };
    connection
      .promise()
      .query(`SELECT * FROM employee_files WHERE emp_id = '${emp_id}'`)
      .then(([rows, fields]) => {
        // console.log(rows)
        res.status(200).send(rows)
      }).catch(err=>{
        res.status(200).json({error:"something went wrong"})
      });
  }
  else{
    res.status(200).send({error:"Bad Request"})
  }
});
UploadedFiles.get("/files/:emp_id/:file_id",(req,res)=>{
  if(req?.session?.email){
    const {emp_id , file_id} = req.params
    connection.promise().query(`SELECT location FROM employee_files WHERE emp_id = '${emp_id}' AND file_id = '${file_id}'`).then(([rows,fields])=>{
      // console.log(rows,fields)
      const filePath = rows[0].location
      res.status(200).download(filePath)
    }).catch(err =>{
      console.log(err)
      res.status(200).send({error:"database error check server console"})
    })
  }
  else{
    res.status(200).send({badRequest:true})
  }
})
UploadedFiles.post("/files/:emp_id/:file_id/delete",(req,res)=>{
  const {emp_id , file_id} = req.params
  if(req?.session?.email)
  {
    const file_location = req.body.location
    fs.unlinkSync(file_location)
    connection
    .promise()
    .query(`DELETE FROM employee_files WHERE emp_id = '${emp_id}' AND file_id = ${file_id}`)
    .then(([rows,fields])=>{
      console.log(rows)
      res.status(200).json({isFileDeleted:true,rows:rows})
    })
    .catch((err)=>{
      res.status(err.status).send({error:err})
    })
    
  }
  else{
    res.status(200).json({error:"bad request"})

  }
})

module.exports = UploadedFiles;
