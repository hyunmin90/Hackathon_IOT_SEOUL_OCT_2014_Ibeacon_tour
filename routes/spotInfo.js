var express = require('express');
var router = express.Router();

router.get('/getTourSpotInfo', function(req, res) {

	var uuid = req.param("uuid");
	var sql ='select seq from uuidbridgeseq where uuid=?';
	var query = dbcon.query(sql,[uuid],function(err,rows){
		console.log(err);
		dbcon.end();
        res.json(rows);
	});
});

module.exports = router;
