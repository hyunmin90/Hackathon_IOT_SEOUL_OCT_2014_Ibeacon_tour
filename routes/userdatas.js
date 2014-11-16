var express = require('express');
var router = express.Router();

router.get('/:uin/cards', function(req, res) { //유저가 가지고있는 Location정보 
	var userid = req.params.uin;
	console.log(userid);
	var sql ='select location from UserLocationCard where UIN=?';
	console.log(sql);
	var query = dbcon.query(sql,[userid],function(err,rows){
		console.log(rows);
        res.json(rows);
	});
});

router.get('/:uin/:locationame/addspotcard/', function(req, res) { //유저가 가지고있는 Location정보 
	var location = req.params.locationame;
	console.log(location);
	
	var sql ='select location from UserLocationCard where UIN=?';
	console.log(sql);
	var query = dbcon.query(sql,[userid],function(err,rows){
		console.log(rows);
        res.json(rows);
	});



});


module.exports = router;
