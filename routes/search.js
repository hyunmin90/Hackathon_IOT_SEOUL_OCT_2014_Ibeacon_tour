var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	res.render('searchpage', { title: 'searchpage'});
});

router.get('/location/:searchlocations', function(req, res) {
	console.log(req.params.searchlocations);
	var location = req.params.searchlocations;
	console.log(location);
	var sql ="select location,imageURL from carddata where location LIKE '"+location+"%'";
	console.log(sql);
	var query = dbcon.query(sql,function(err,rows){
		console.log(rows);
        res.json(rows);
	});
});

module.exports = router;
