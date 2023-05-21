// 불러들일 것들
const express = require('express');
const app = express();
const ejs = require('ejs');
const db = require('./model/db');

// 엑셀데이타로 다운
const json2xls = require('json2xls');
app.use(json2xls.middleware);

// 라우터
const mainRouter = require('./router/mainRouter.js');
app.use('/', mainRouter);

// 비주얼엔진,위치
app.set('view_engine', 'ejs');
app.set('views', './views');

// 미들웨어
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());


// 사용포트
app.listen(3000, function(req,res){
    db.sequelize.sync({force: true});
    console.log('서버 실행됨');
})