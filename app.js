var express= require('express');
var app= express();

var port = process.env.PORT || 8080;

var bodyParser= require('body-parser');
var User= require('./models/User');
var Action= require('./models/Action');
var Comment= require('./models/Comment');
var Event= require('./models/Event');
var methodOverride= require('method-override');

var async= require('async');

var passport= require('passport');
var localStrategy= require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');

var nodemailer= require('nodemailer');


var schedule= require('node-schedule');
var Q = require('q'),
moment = require('moment'),
ejs= require('ejs');

var cron = require('cron');


module.exports = app;

var indexRoutes = require('./routes/index');
var  actionRoutes = require('./routes/actions');
var commentRoutes = require('./routes/comments');
var newsLetter = require('./routes/newsletter');

var $ = require('jquery')


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//Passport Configuration
app.use(require('express-session')({
	secret: "NatureNiners working on Nature-Net application",
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'natureniners@gmail.com',
    pass: 'ITis@6177'
  }
});

app.use(function(req,res, next){
res.locals.currentUser= req.user;
next();
});
app.use(express.static(__dirname+"/public"));
console.log(__dirname+"/public");
app.use(indexRoutes);
app.use("/actions",actionRoutes);
app.use("/actions/:id/comment",commentRoutes);



app.get("/comments",function(req,res){

Comment.find({},function(err,comments){
	if(err){
		console.log(err);
	}
	else {
		res.status(200).json(comments);
		//res.render("actions.ejs",{actions: actions});	
	}
})
});


app.get("/newsletter/actions",function(req,res){
	var days=1;
	var date= new Date();
	var last= new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
	console.log(last);
	Action.find({},function(req,actions){
		var news= new Array();
		async.each(actions,function(action,callback){
			if(action.pubDate < date && action.pubDate> last){
			console.log("its here!");
			//console.log(action);
			news.push(action);						
		}
		
	});	
		res.render("email.ejs",{Content: news});
		});	
		
});

app.get("/home",function(req,res){
	res.render("dashboard.ejs",{id: req.user._id, name: req.user.firstName});
});

app.get("/register",function(req,res){
  res.render("register.ejs");
});

app.get("/about",function(req,res){
	res.render("About.ejs");
});

app.get("/",function(req,res){
	res.redirect("/about");
});

app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Server started "+ process.env.PORT);
});