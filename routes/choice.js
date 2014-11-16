var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:uin', function(req, res) {
  var uin=req.params.uin;
  res.render('choicepage', { title: 'choice',UIN: uin});
});

module.exports = router;


