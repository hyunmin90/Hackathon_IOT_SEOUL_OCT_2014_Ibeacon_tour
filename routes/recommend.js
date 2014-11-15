var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/historical', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/shopping', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/food', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/nature', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/kwave', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/culture', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

router.get('/sports', function(req, res) {
  res.render('recommendpage', { title: 'recommend' });
});

module.exports = router;


