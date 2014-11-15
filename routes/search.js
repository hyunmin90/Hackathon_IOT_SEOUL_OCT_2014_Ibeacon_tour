var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	res.render('searchpage', { title: 'searchpage'});
});

router.get('/location/:searchlocations', function(req, res) {

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
