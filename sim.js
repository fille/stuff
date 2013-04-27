var express = require('express'),stylus = require('stylus'),nib = require('nib')
var dirname = "/home/fille/siv/"
var mysql =  require('mysql')

var connection = mysql.createConnection({host:'localhost',user:'root',password:'root',database:"myinter"})


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

app.post('/login',function(req,res){
	
	var user = req.body.user;
	var pass = req.body.pass;
		
	connection.connect();	
	connection.query("select * from users where user='"+ user +"'",function(err,rows,fields){
		
		
		console.log(rows);
	 	res.render('index',{title:'Home','status':"found"});
		
		
	})
});


app.listen(3000)
