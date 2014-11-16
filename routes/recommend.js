var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/historical', function(req, res) {
  res.render('recommend_historical', { title: 'recommend' });
});

router.get('/shopping', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/food', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});


router.get('/kwave', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/culture', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/sports', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/nature', function(req, res) {
  var nature = 'nature';
  var sql ='select id,seq,imageUrl,mapUrl,location from carddata where category=?';
	console.log(sql);
	console.log(sql);
	var query = dbcon.query(sql,[nature],function(err,rows){
		// for(i=0; i<rows.length; i++){
		// 	var result = res.json({id:rows[i].id, seq:rows[i].seq, imageUrl:rows[i].imageUrl, mapUrl:rows[i].mapUrl, location:rows[i].location })
		// 	console.log(result)
		// }
		//res.json({tmName:tmName, tmDescript:tmDescript, imageUrl:imageUrl});
		
		res.render('recommend_nature', { title: 'mainpage', array : rows});
	});
});

module.exports = router;