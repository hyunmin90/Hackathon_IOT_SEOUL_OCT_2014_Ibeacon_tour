var express = require('express');
var router = express.Router();




router.get('/', function(req, res) {
  
});

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',

router.get('/login_success', ensureAuthenticated, function(req, res){

    res.send(req.user);
});
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/');
}




module.exports = router;
