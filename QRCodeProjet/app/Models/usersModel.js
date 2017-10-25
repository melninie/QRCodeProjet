var connection=require('../connection');

var Users={
    ObtAllUsers:function(callback)
    {
        return connection.query("select * from users", callback);
    }
};
module.exports=Users;
