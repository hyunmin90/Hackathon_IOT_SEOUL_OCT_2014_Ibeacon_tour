var express = require('express');
var router = express.Router();

router.get('/:UIN/cards', function(req, res) { //유저가 가지고있는 Location정보 
	var userid = req.params.UIN
	var uuid = req.param("uuid");
	console.log(uuid);
	var sql ='select location from UserLocationCard where UIN=?';
	console.log(sql);
	var query = dbcon.query(sql,uuid,function(err,rows){
		console.log(rows);
        res.json(rows);
	});
});

module.exports = router;
