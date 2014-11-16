var express = require('express');
var router = express.Router();

router.get('/:uin/cards', function(req, res) { //유저가 가지고있는 Location정보 
	var userid = req.params.uin;
	console.log(userid);
	var sql ='SELECT c.id AS id,c.seq AS seq,c.imageUrl AS imageUrl, c.mapUrl AS mapUrl, c.location AS location FROM carddata c JOIN userlocationcard l ON c.id = l.location_id WHERE l.uin =?';
	console.log(sql);
	var query = dbcon.query(sql,[userid],function(err,rows){
		console.log(rows);
        res.json(rows);
	});
});

router.get('/:uin/:locationame/addspotcard/', function(req, res) { //유저가 가지고있는 Location정보 
	var location = req.params.locationame;
	var uin = req.params.uin;

	console.log(location);
	var sql ="insert into userlocationcard (location_id,UIN,location) (select t1.id,'"+uin+"','"+location+"' from carddata t1 where t1.location='"+location+"')";
	console.log(sql);
	var query = dbcon.query(sql,function(err,rows){
		console.log(rows);
        res.json(rows);
	});
   	location.href="http://ec2-54-64-134-27.ap-northeast-1.compute.amazonaws.com:3000/login/login_success";
});

module.exports = router;