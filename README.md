# 咔咔出行（出行可视化）

## 项目简介

解决出行问题，用于出行行程记录，路线规划，数据可视化分析的移动端webapp

## 项目截图

**私人出行**
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/1.jpg)
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/2.jpg)
**公共交通**
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/3.jpg)
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/4.jpg)
**历史列表**
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/5.jpg)
**我的信息**
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/6.jpg)
![](https://raw.githubusercontent.com/wwenj/MyPicture/master/tripRecord/7.jpg)

## 技术栈

- **前端**：移动端，vue全家桶，Mand组件库，Echarts.js，Scss

- **后端**：Node，Express框架，高德地图API
- **数据库**：Mysql

## 功能模块

### 个人出行
用户个人出行，不确定路程、目的地等信息，选择出行工具，点击开始，系统实时监听用户手机位置得到WGS84经纬度坐标（w3c HTML5 Geolocation地理定位标准），行程结束，记录本次出行信息，经纬度坐标转换GCJ-02坐标体系，通过高德地图提供三方API绘制出行轨迹。

### 公共交通
用户确定出发地、目的地、交通工具，选择公共交通出行，用户输入位置关键字，选择合适出发/目的位置，选择乘坐交通工具，规划出行路线，选择某一条路线，确定后点击保存上传本次出行记录

### 历史列表
按时间顺序查看所有出行的历史记录，可查看出行的详情信息、行程轨迹、路线规划

### 我的信息（未完成）
查看我的详情信息，通过出行数据分析得到的出行趋势折线图，与出行数据相关的数据分析图表，其他功能未写

## 项目构建
### 前端
前端在`vue-cli3`基础上开发，在此之上根据项目需求对项目工程作出几点修改，前端代码在`view/`文件夹中 

- **移动端适配**：之前做移动端开发一直使用[手淘的分辨率适配方案](https://www.w3cplus.com/css/vw-for-layout.html)，本项目根据大漠的[《如何在Vue项目中使用vw实现移动端适配》](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)，对移动端分辨率用webpack在工程中配置。

- **请求拦截器**：在`view/src/request/`中，基于`axios`提供的`interceptors`对所有ajax的请求和响应添加相应操作，如请求头添加，token添加，响应后台错误状态码的识别与报错；简单封装了下axios请求，主要为get，post两种。

- **导航守卫**：在`view/src/router/`中，做了全局导航守卫，未登录用户只能访问项目登录页面。

- **工具类**：在`view/src/utils/`中，对常用枚举值、全局组件注册、常用类封装等功能做模块化封装。

- **css样式**：在`view/src/style/`中，全局公共样式，初始化样式。

- **svg组件**：在`view/src/icons/`中，封装用于svg展示组件，用做小icon的展示，svg保存该文件夹中。

- **模块化**：对路由与vuex做模块化封装。

- **地图**：所有地图、地理信息、轨迹、路线规划功能有**高德地图**第三方API提供

### 后端
- 使用`Node`的`express`框架，连接`Mysql`数据库，做数据接口开发，数据的增删改查与简单封装。

## 小结

### 项目简结
- 难度：简单
- 开发时长：前期调研，编码一周
- 关键字：移动端，出行，可视化，高德地图，Echart图表

### 过程总结
- **想法产出**：因为在滴滴出行的实习经历，准备做款有关出行平台的，有关前端可视化的产品。

- **需求调研**：结合`出行` `可视化` 关键字做需求分析，调研`悦动圈`、`悦跑圈`、`滴滴出行`、`百度地图`、`高德地图`确定几个主要功能
  1. 实时定位，绘制出行轨迹(悦跑圈，已完成) 

  2. 路线规划，规划路线绘制路径图(百度地图，已完成)

  3. 网约车，快车，专车，顺风车在线叫车(滴滴出行，未完成)

  4. 可视化分析，出行数据的可视化分析(已完成)
- **技术调研**：
  1. 选取HTML5 Geolocation提供的物理位置实时监听功能，获取到WGS84经纬坐标
  
  2. 选取高德地图第三方API提供地图，地理位置，轨迹绘制，路线规划等功能

  3. 选择开发移动端项目，用滴滴的`Mand`作为移动端UI组件库

  4. 选取`Node`为服务端，`Express`为后端框架，`Mysql`为数据库
  
### 难点总结

 产品从无到有是最困难的，项目虽然不难，可前期产品调研，技术调研，项目构建确花费了大量时间，相比照着成品写多了很多不一样的体验

### 补充

 
 注：因为马上毕业，这只是为了应对毕业设计临时写的小项目，没想到会有这么多star，时间有限主要实现核心功能，产品还是很粗糙，我会找时间完善下，谢谢

### 更新 2019.11.15

项目已上线，可以点击体验[http://demo.wwenj.com/tripRecord](http://demo.wwenj.com/tripRecord)

项目传到服务器上了，只需要克隆项目，运行前端代码，接口会访问线上服务器。   
如果想要访问自己本地服务，在/view/src/request/http.js更改前端请求为自己ip，把表导入去连接自己的数据库即可，谢谢。

**因为浏览器端定位本身受限因素很多，定位成功率也不是很高，很可能出现没有权限，定位失败问题，可尝试开启权限或更换浏览器。**

## 项目运行

``` bash
# 克隆项目
git clone git@github.com:wwenj/tripRecord.git

# 分别进入view/，server/文件夹分别下载依赖
cd view/server

npm install

# 导入mysql数据库表

# view下前端项目 打开端口localhost:8080
npm run serve
# 也可以不运行后端，项目已上线会访问线上接口，想连接本地服务器需改变接口地址
# serve下运行后端项目（必须先导入数据库表）
DEBUG=myapp:* npm start

# 前端项目打包
npm run build

```

作者 [[man@wwenj.com\]](http://www.wwenj.com/)    

2019 年 6月 6日 
