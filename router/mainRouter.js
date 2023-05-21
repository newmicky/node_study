const express = require('express');
const router = express.Router();
const db = require('../model/db');

const cheerio = require('cheerio');
const axios = require('axios');
const iconv = require('iconv-lite');

const url ='https://finance.naver.com/sise/lastsearch2.naver';

// 네이버 증권 크롤링
router.get('/crawling', function(req,res){
    axios({url:url, method:'GET', responseType:'arraybuffer'}).then(function(html){
        const content = iconv.decode(html.data, "EUC-KR").toString();
        const $ = cheerio.load(content);
        const table = $('.type_5 tr td');
        table.each(function(i, tag){
            console.log($(tag).text().trim());
        })
    });
    res.send({success: 200});
})

// 엑셀 데이타변환
router.get('/excel', function(req,res){
    res.render('excel.ejs');
})

// 엑셀데이타로 다운
router.get('/excel/down', function(req,res){
    let excel_data = [{"A": 257, "B": 333}]
    res.xls('data.xlsx', excel_data);
})

// 메인페이지
router.get('/', function(req,res){
    res.render('main.ejs', {title:"영화리뷰 서버"});
})

// 리뷰만들기 post 방식
router.post('/review/create', function(req,res){
    let movie_id = req.body.movie_id;
    let review = req.body.review;

    if(movie_id == '' || movie_id == 0){
        res.send({success: 400})
    }else{
        db.reviews.create({
            movie_id: movie_id,
            review: review
        }).then(function(result){
            res.send({success: 200});
        })
    }
})

// 리뷰불러오기  get방식
router.get("/review/read", function(req,res){
    let movie_id = req.query.movie_id;

    db.reviews.findAll({where:{movie_id:movie_id}}).then(function(result){
        res.send({success:200, data:result})
    })
})

// 데이타 CRUD
router.get('/data/create', function(req,res){
    let random_id = parseInt(Math.random() * 1000);

    db.users.create({user_id:random_id}).then(function(result){
        res.send({success: 200});
    })
})

router.get('/data/read', function(req,res){
    db.users.findAll().then(function(result){
        res.send({success: 200, data: result});
    })
})

router.post('/data/update', function(req,res){
    let target_id = req.body.target_id;

    db.users.update({user_id: 9999}, {where:{user_id: target_id}}).then(function(result){
        res.send({success: 200});
    })
})

router.post('/data/delete', function(req,res){
    let target_id = req.body.target_id;

    db.users.destroy({where:{user_id: target_id}}).then(function(result){
        res.send({success: 200});
    })
})

// app.js에서 쓸수 있게 값 내보내기
module.exports = router;