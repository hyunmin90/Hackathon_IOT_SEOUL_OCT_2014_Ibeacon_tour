var express = require('express');
var router = express.Router();

router.get('/getTourSpotInfo', function(req, res) {
	var uuid = req.param("uuid");
	var sql ='select seq from uuidbridgeseq where uuid="2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6"';
	var query = dbcon.query(sql,function(err,rows){
		console.log(err);
		dbcon.end();
        res.json(rows);
	});
});

module.exports = router;
