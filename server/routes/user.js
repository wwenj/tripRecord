var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var ACC = require('../account');

var data = {
  code: 200,
  msg: 'success'
}; //最后返回的json对象

var pool = mysql.createPool(
  ACC.mysql
  // {
  //     host: '39.**.*.114',
  //     user: '**',
  //     password: '**',
  //     database: '**'
  // }
);
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
// 获取最近一周
router.get('/tripTrend', function (req, res, next) {
  let tmpId = req.query.userId
  //增删改查之后查询，并把查询的最终数据返回前端

  pool.query(`SELECT * FROM trip_data where userId=${tmpId} and DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(date)`, function (err, results, fields) {
      if (err) {
          data.code = 500
          data.msg = err
      };
      // 更改经纬度坐标数据类型
      results.forEach((item) => {
          if (item.trajectory) {
              item.trajectory = JSON.parse(item.trajectory)
          }
          if (item.startCode) {
              item.startCode = item.startCode.split(',')
              item.endCode = item.endCode.split(',')
          }
      })
      data.data = results.reverse()
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
  });
})
module.exports = router;