var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');

var ServiceKey='kovsIkiq0a1AX7kkwPnbGwUYEgKwE%2FSssb5ySRZuweChWD61Tjvr33TMUvxAut6w%2Fqmf6GvMv1IPpZwIhXMIXQ%3D%3D';
var apikey='';

router.get('/getTourSpotInfo', function(req, res) {

	var uuid = req.param("uuid").toUpperCase();
	var sql ='select seq from uuidbridgeseq where uuid=?';
	var query = dbcon.query(sql,[uuid],function(err,rows){

		console.log(err);
		var SEQ = rows[0].seq;
		console.log(err);

		/*request({ method: 'GET',
					url: 'http://openapi.jejutour.go.kr:8080/openapi/service/TourMapService/getTourMapView?_type=json&ServiceKey='+ServiceKey+'&SEQ='+SEQ,
				}, function(err, response) {
					var value = JSON.parse(response.body);
					var tmName = value.response.body.items.item.tmName;
					console.log(tmName);

					var tmDescript = value.response.body.items.item.tmDescript;
		*/
					var tmDescript = '안녕하세요';

					request({ method: 'GET',
							  url: 'https://www.googleapis.com/language/translate/v2?key=AIzaSyANiZ1tyl7-Hj_OmvNrgg0J9k_dEUh52tU&source=ko&target=en&q='+encodeURIComponent(tmDescript),
					}, function(err, response) {
						var value = JSON.parse(response.body);
						res.json(value.data.translations[0].translatedText);
						/*
						request({ method: 'GET',
								  url: 'https://apis.daum.net/local/v1/search/keyword?apikey=DAUM_LOCAL_DEMO_APIKEY&image=only&query='+encodeURIComponent(tmName),
						}, function(err, response) {
							var DaumValue = JSON.parse(response.body);
							var imageUrl = DaumValue.channel.item[0].imageUrl;
							res.json({tmName:tmName, tmDescript:tmDescript, imageUrl:imageUrl});
						});*/
					});
				//});
	});
});

//https://www.googleapis.com/language/translate/v2?key=AIzaSyANiZ1tyl7-Hj_OmvNrgg0J9k_dEUh52tU&source=ko&target=en&callback=translateText&q=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94

module.exports = router;
