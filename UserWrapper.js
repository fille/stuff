
exports.UserWrapper = function(conn){

	return new wrapper(conn)
} 

var  wrapper = function(conn) {

   var self = this;
	self.connection = conn;
	
	self.GetUserWithPassword= function(username,password) {
		self.connection.query("select * from Users where username='"+ username +"' and '"+ password + "'" ,function(err,rows,fields){
				console.log(rows);
		});
	}

}