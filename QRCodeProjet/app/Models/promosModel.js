var connection=require('../../config/dbconnection');

var Promos={

    ObtAllPromos:function(callback)
    {
        return connection.query("select * from promotion", callback);
    },

    ObtPromoId:function(id, callback)
    {
        return connection.query("select * from promotion where idP=?", [id], callback);
    }
};
module.exports=Promos;
