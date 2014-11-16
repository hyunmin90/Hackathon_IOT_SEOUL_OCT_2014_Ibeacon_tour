var express = require('express');
var router = express.Router();

router.get('/:uin', function(req, res) {
	var uin=req.params.uin;
	res.render('searchpage', { title: 'searchpage',UIN: uin});
});

router.get('/location/:searchlocations/', function(req, res) {
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
