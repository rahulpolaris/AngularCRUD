const express = require('express')
const UploadedFiles = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/employeesSqlDb')
const multer = require('multer')
const storage = multer.diskStorage({destination:path.join(__dirname, "../../resources/fie_storage"),
filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },limits:{fileSize:26214400}})
const upload = multer({storage})
UploadedFiles.post("/files",(req,res)=>{
    if(req?.session?.email){
      console.log(req.file)

    }
    else{
        res.status(200).send({error:"Bad Request"})
    }
})