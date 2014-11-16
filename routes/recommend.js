var express = require('express');
var router = express.Router();
var sql ='select id,seq,imageUrl,mapUrl,location from carddata where category=?';

router.get('/', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/historical', function(req, res) {
  var historical = 'historical';
  var query = dbcon.query(sql,[historical],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});

router.get('/shopping', function(req, res) {
  var shopping = 'shopping';
  var query = dbcon.query(sql,[shopping],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});

router.get('/food', function(req, res) {
  var food = 'food';
  var query = dbcon.query(sql,[food],function(err,rows){
    res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});


router.get('/kwave', function(req, res) {
  var kwave = 'kwave';
  var query = dbcon.query(sql,[kwave],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});

router.get('/culture', function(req, res) {
  var culture = 'culture';
  var query = dbcon.query(sql,[culture],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});

router.get('/sports', function(req, res) {
  var sports = 'sports';
  var query = dbcon.query(sql,[sports],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});

router.get('/nature', function(req, res) {
  var nature = 'nature';
  var query = dbcon.query(sql,[nature],function(err,rows){
	res.render('recommend_info', { title: 'mainpage', array : rows});
  });
});

module.exports = router;