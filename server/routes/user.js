var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var data = {
  code: 200,
  msg: 'success'
}; //最后返回的json对象

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '8151186051',
  database: 'trip'
});
router.post('/', function (req, res, next) {
  let userName = req.body.userName
  let passWord = req.body.passWord
  //增删改查之后查询，并把查询的最终数据返回前端
  pool.query(`SELECT * FROM user where userName=${userName}`, function (err, results, fields) {
    if (err) {
      data.code = 500
      data.msg = err
    };
    if (results[0].passWord === passWord) {
      selectUser(results[0].userId)
    } else {
      data.code = 400
      data.msg = '账号或密码输入有误'
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
    }
  });

  function selectUser(id) {
    pool.query(`SELECT * FROM user_info where userId=${id}`, function (err, results, fields) {
      if (err) {
        data.code = 500
        data.msg = err
      };
      data.code = 200
      data.msg = 'sucess'
      data.data = results[0]
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
    })
  }
})
module.exports = router;