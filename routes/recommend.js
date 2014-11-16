var express = require('express');
var router = express.Router();
var sql ='select id,seq,imageUrl,mapUrl,location from carddata where category=?';

router.get('/:uin', function(req, res) {
  var uin=req.params.uin;
  res.render('recommendpage', { title: 'recommend' , uin:uin});
});

router.get('/:uin/historical', function(req, res) {
  var uin=req.params.uin;
  var historical = 'historical';
  var query = dbcon.query(sql,[historical],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});

router.get('/:uin/shopping', function(req, res) {
  var uin=req.params.uin;
  var shopping = 'shopping';
  var query = dbcon.query(sql,[shopping],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});

router.get('/:uin/food', function(req, res) {
  var uin=req.params.uin;
  var food = 'food';
  var query = dbcon.query(sql,[food],function(err,rows){
    res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});


router.get('/:uin/kwave', function(req, res) {
  var uin=req.params.uin;
  var kwave = 'kwave';
  var query = dbcon.query(sql,[kwave],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});

router.get('/:uin/culture', function(req, res) {
  var uin=req.params.uin;
  var culture = 'culture';
  var query = dbcon.query(sql,[culture],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});

router.get('/:uin/sports', function(req, res) {
  var uin=req.params.uin;
  var sports = 'sports';
  var query = dbcon.query(sql,[sports],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});

router.get('/:uin/nature', function(req, res) {
  var uin=req.params.uin;
  var nature = 'nature';
  var query = dbcon.query(sql,[nature],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows, uin:uin});
  });
});

module.exports = router;