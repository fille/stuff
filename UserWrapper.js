
exports.UserWrapper = function(conn){

	return new wrapper(conn)
} 

var  wrapper = function(conn) {

   var self = this;
	self.connection = conn;
	self.GetUserWithPassword= function(username,password,callback) {

		self.connection.query("select * from Users where username='"+ username +"' and password='"+ password + "'" ,function(err,rows,fields){
				callback(rows);
		});
	}
	self.Insert= function(username,password){
	
		sql ="insert into Users(username,password) Values('"+ username +"','"+ password +"')"	
		self.connection.query(sql,function(err,row,fields) {
		})
	}
}