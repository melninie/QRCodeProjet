var connection=require('../../config/dbconnection');

var Promos={

    ObtAllPromos:function(callback)
    {
        return connection.query("select * from promotion", callback);
    },

    ObtPromoId:function(id, callback)
    {
        return connection.query("select * from promotion where idP=?", [id], callback);
    },

    /*PutUserId:function(id, nom, prenom, mail, promo, callback) {
        return connection.query("update users SET nomU=?, prenomU=?, mailU=?, promotionU=? where id=?", [nom, prenom, mail, promo, id], callback)
    },*/

    DelPromoId:function(id) {
        return connection.query("delete from promotion where idP=?", [id])
    }

};
module.exports=Promos;
