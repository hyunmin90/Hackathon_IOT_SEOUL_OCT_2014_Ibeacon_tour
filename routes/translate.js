var express = require('express');
var router = express.Router();
var request = require('request');
var url = require('url');


router.get('/fromkorean', function(req, res) {

    var sourceText = req.query.text;

   
    
     request({ method: 'GET',
                              url: 'https://www.googleapis.com/language/translate/v2?key=AIzaSyANiZ1tyl7-Hj_OmvNrgg0J9k_dEUh52tU&source=ko&target=en&q='+encodeURIComponent(sourceText),
                    }, function(err, response) {
                        var value = JSON.parse(response.body);
                        res.json(value.data.translations[0].translatedText);
           
                    });
   
});
router.get('/fromenglish', function(req, res) {

    var sourceText = req.query.text;

   
    
     request({ method: 'GET',
                              url: 'https://www.googleapis.com/language/translate/v2?key=AIzaSyANiZ1tyl7-Hj_OmvNrgg0J9k_dEUh52tU&source=eng&target=ko&q='+sourceText,
                    }, function(err, response) {
                        var value = JSON.parse(response.body);
                        res.json(value.data.translations[0].translatedText);
           
                    });
   
});



module.exports = router;




                    