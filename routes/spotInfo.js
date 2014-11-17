var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');

var ServiceKey='kovsIkiq0a1AX7kkwPnbGwUYEgKwE%2FSssb5ySRZuweChWD61Tjvr33TMUvxAut6w%2Fqmf6GvMv1IPpZwIhXMIXQ%3D%3D';
var apikey='70b03e504f23d854ad07fad4c02796d258e9b426';

router.get('/getTourSpotInfo', function(req, res) {

	var uuid = req.param("uuid").toUpperCase();
	var sql ='select seq, location from carddata where uuid=?';
	var query = dbcon.query(sql,[uuid],function(err,rows){

		console.log("err : "+err);
		console.dir(rows);
		var SEQ = rows[0].seq;
		var location_EN = rows[0].location;

		console.dir(SEQ);
		console.dir(location_EN);

		request({ method: 'GET',
					url: 'http://openapi.jejutour.go.kr:8080/openapi/service/TourMapService/getTourMapView?_type=json&ServiceKey='+ServiceKey+'&SEQ='+SEQ,
				}, function(err, response) {
					var value = JSON.parse(response.body);

					var tmName = value.response.body.items.item.tmName;
					console.log(tmName);
						//indexOf( SubStr1 )
					var tmDescript = value.response.body.items.item.tmDescript;
					tmDescript = tmDescript.substring(0,tmDescript.indexOf('\n'));

					request({ method: 'GET',
							  url: 'https://www.googleapis.com/language/translate/v2?key=AIzaSyANiZ1tyl7-Hj_OmvNrgg0J9k_dEUh52tU&source=ko&target=en&q='+encodeURIComponent(tmDescript),
					}, function(err, response) {

						var value = JSON.parse(response.body);

						var tmDescript_EN = value.data.translations[0].translatedText;

						request({ method: 'GET',
								  url: 'https://apis.daum.net/local/v1/search/keyword?apikey='+apikey+'&image=only&query='+encodeURIComponent(tmName),
						}, function(err, response) {
							var DaumValue = JSON.parse(response.body);
							var imageUrl = DaumValue.channel.item[0].imageUrl;
							res.json({tmName:location_EN, tmDescript:tmDescript_EN, imageUrl:imageUrl});
						});
					});
				});
	});
});
module.exports = router;
