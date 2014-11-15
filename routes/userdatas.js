var express = require('express');
var router = express.Router();

router.get('/:UIN/cards', function(req, res) { //유저가 가지고있는 Location정보 
	var userid = req.params.UIN
	var uuid = req.param("uuid");
	var sql ='select location from UserLocationCard where UIN=?';
	var query = dbcon.query(sql,[uuid],function(err,rows){
		console.log(err);
        res.json(rows);
	});
});

module.exports = router;
