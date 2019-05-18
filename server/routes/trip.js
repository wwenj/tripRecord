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
/* GET users listing. */
// 历史列表接口
router.get('/historyList', function (req, res, next) {
    let tmpId = req.query.userId
    //增删改查之后查询，并把查询的最终数据返回前端
    pool.query(`SELECT * FROM trip_data where userId=${tmpId}`, function (err, results, fields) {
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

// 出行总公里数
router.get('/allDistance', function (req, res, next) {
    let tmpId = req.query.userId
    //增删改查之后查询，并把查询的最终数据返回前端
    pool.query(`SELECT * FROM total_data where userId=${tmpId}`, function (err, results, fields) {
        if (err) {
            data.code = 500
            data.msg = err
        };
        // 更改经纬度坐标数据类型
        data.data = results[0]
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
})
// 插入出行数据
router.get('/addTrip', function (req, res, next) {
    let query = req.query
    console.log(query)
    console.log(`${query.tmpId},${query.type},${query.tripType},${query.distance},${query.date},${query.time},${query.Calorie},${query.speed}`)
    //增删改查之后查询，并把查询的最终数据返回前端
    pool.query(`INSERT INTO trip_data ( userId, type,tripType,distance,date,time,trajectory,Calorie,speed) VALUES ('${query.userId}','${query.type}','${query.tripType}','${query.distance}','${query.date}','${query.time}','${query.trajectory}','${query.Calorie}','${query.speed}')`, function (err, results, fields) {
        if (err) {
            data.code = 500
            data.msg = err
        }else{
            data.data ='插入成功'
            data.code = 200
        }
        // 更改经纬度坐标数据类型
        res.statusCode = 200;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    });
})
module.exports = router;