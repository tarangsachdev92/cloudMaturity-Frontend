const express = require("express");
const path =require('path');
const app = express();
app.use(express.static(__dirname+'/dist/cloud-maturity-assessment-frontend'));
app.listen(process.env.PORT || 3300);

app.get('/*',function(req,res){
  res.sendFile(path.join(__dirname+'/dist/cloud-maturity-assessment-frontend/index.html'))
})

console.log("server listening");