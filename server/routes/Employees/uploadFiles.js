const express = require('express')
const UploadedFiles = express.Router()
const path = require('path')
const connection = require('../../resources/db_connections/employeesSqlDb')
const multer = require('multer')
const storage = multer.diskStorage({destination:path.join(__dirname, "../../resources/file_storage"),
filename: function (req, file, cb) {
  let extensionName
  if(file)
  {
    const originalFileName = file.originalname
    const dotPos = originalFileName.lastIndexOf('.')
  extensionName =  originalFileName.slice(-(originalFileName.length-dotPos))  }
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+ extensionName
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }})
const upload = multer({storage:storage})


UploadedFiles.post("/files",upload.single('file'),(req,res)=>{
  console.log("Hitting file transfer route .......................",)
    if(req?.session){
      console.log(req.body)
      console.log(req.file, req.files)
      res.status(200).json({sessionData:req.session})

    }
    else{
        res.status(200).send({error:"Bad Request"})
    }
})

module.exports = UploadedFiles