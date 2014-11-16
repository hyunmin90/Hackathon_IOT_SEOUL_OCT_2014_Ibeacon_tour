var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');

var ServiceKey='kovsIkiq0a1AX7kkwPnbGwUYEgKwE%2FSssb5ySRZuweChWD61Tjvr33TMUvxAut6w%2Fqmf6GvMv1IPpZwIhXMIXQ%3D%3D';
var apikey='';

router.get('/', function(req, res) {

	var enlocation = req.param("enlocation");
	var krlocation = req.param("krlocation");

	return res.render('map', {
	  enlocation:enlocation,
	  krlocation:krlocation
	});

});
//다음 지도 띄우기용
router.get('/iframe', function(req, res) {
	var Lat = req.param("Lat");
	var Lng = req.param("Lng");
	return res.render('mapIframe',{
		Lat:Lat,
		Lng:Lng
	});
});


router.get('/getLatLng', function(req, res) {

	var location = req.param("location");
	request({ method: 'GET',
			  url: 'https://apis.daum.net/local/v1/search/keyword?apikey=DAUM_LOCAL_DEMO_APIKEY&image=only&query='+encodeURIComponent(location),
	}, function(err, response) {
		var result = JSON.parse(response.body);
		res.json({Lat:result.channel.item[0].latitude, Lng:result.channel.item[0].longitude});
	});
});

//https://www.googleapis.com/language/translate/v2?key=AIzaSyANiZ1tyl7-Hj_OmvNrgg0J9k_dEUh52tU&source=ko&target=en&callback=translateText&q=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94

module.exports = router;
