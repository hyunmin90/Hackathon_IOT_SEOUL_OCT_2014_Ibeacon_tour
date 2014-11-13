var express = require('express');
var router = express.Router();

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

// serialize
// 인증후 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {

	//var queryString = "INSERT INTO `users` (`username`,`UIN`) VALUES ('"+user.displayName+"', '"+user.id+"')";


    console.log('serialize');

    console.log(user.id);
    console.log(user.displayName);
   	console.log(checkifregistered(user.id));
    //console.log(user);
    //console.log(user.last_name);


    /*dbcon.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 	console.log(rows);
	});*/
 	

    done(null, user);
});


// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
passport.deserializeUser(function(user, done) {
    //findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
});


passport.use(new FacebookStrategy({
        clientID: ' 410689979097098 ',
        clientSecret: '47d689b5c9a71d166e87fa2d9dd30ab7',
        callbackURL: "http://ec2-54-64-134-27.ap-northeast-1.compute.amazonaws.com:3000/login/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null,profile);
    }
));


router.get('/auth/facebook', passport.authenticate('facebook'));



router.get('/auth/facebook/callback',
passport.authenticate('facebook', { successRedirect: '/login/login_success',
failureRedirect: '/login/login_fail' }));



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

function checkifregistered(UIN)
{	
	var numberofString;
	var queryString = "SELECT * FROM users WHERE UIN='"+UIN+"'";
	dbcon.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 	console.log(rows);
 	//console.log(rows.length);
 	numberofString=rows.length;
	});
	console.log(numberofString);

	return numberofString;
}


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
