var express = require('express'),stylus = require('stylus'),nib = require('nib')
var dirname = "/home/fille/siv/"
var mysql =  require('mysql')
var crypto = require('crypto')
var connection = mysql.createConnection({host:'localhost',user:'root',password:'root',database:"myinter"})

var userwrapper =  require('./UserWrapper').UserWrapper(connection);

var compiler = function(str,path) {	
	return  stylus.set('filename',path).use(nib())
}
var app = express();

app.set("view engine",'jade')
app.set("views",__dirname+'/views');

app.use(stylus.middleware(
  { src:dirname + '/public'
  , compile: compiler
  }
))

app.use(express.static(__dirname+'/public'))
app.use(express.bodyParser());

app.get('/',function(req,res) {
		res.render('index',{title:'Home'});
});

app.post('/login',function(req,res,next){
	var user = req.body.user;
	var pass = req.body.pass;
	var realpass = getHasha(pass)
	userwrapper.GetUserWithPassword(user,realpass,function(rows) {
	
	rows.forEach(function(obj) {
				if(obj.username == user) {
					
					if(typeof req.cookies['connection.sid'] != 'undefiend') {
						 console.log(req.cookies['connect.sid']);
					}
					next();
				}
		})
		
	res.render('index',{title:'Home','status':"found"});
	})
	})

var getHasha = function(string) {
	var sha = crypto.createHash('sha1');
	sha.update(string+ "salt");
 	var d =	sha.digest('hex');
	return d;	
}
app.post('/createUser',function(req,res) {
	var user = req.body.name;
	var pass = req.body.pass;
	var realpass = getHasha(pass);
	var rows =userwrapper.Insert(user,realpass)
	 res.end(user);
  })


app.listen(3000)

