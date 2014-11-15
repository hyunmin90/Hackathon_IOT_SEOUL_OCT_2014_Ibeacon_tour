var express = require('express');
var router = express.Router();

router.get('/:searchlocations', function(req, res) {

	var location = req.params.searchLocation;
	console.log(userid);
	var sql ='select location from carddata where location=?';
	console.log(sql);
	var query = dbcon.query(sql,[location],function(err,rows){
		console.log(rows);
        res.json(rows);
	});
});

module.exports = router;
