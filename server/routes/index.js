var express = require('express');
var fs = require("fs");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {


        // res.statusCode = 200;
        // res.setHeader("Access-Control-Allow-Origin", "*");
        // res.setHeader('Content-Type', 'application/json');
        // res.json(data);

function readImage(path,res){
  console.log(path)
  fs.readFile(path,'binary',function(err,  file)  {
      if  (err)  {
          console.log(err);
          return;
      }else{
          console.log("输出文件");
          res.writeHead(200,  {'Content-Type':'image/jpeg'});
          res.write(file,'binary');
          res.end();
      }
  });
}
readImage('/public/images/head.jpeg',res)
});

module.exports = router;
