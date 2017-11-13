var connection=require('../../config/dbconnection');

var Users={
    ObtAllUsers:function(callback)
    {
        return connection.query("select * from users u LEFT JOIN promotion p ON u.promotionU=p.idP Order by nomU, prenomU ASC", callback);
    },

    ObtUserId:function(id, callback) {
        return connection.query("select * from users where id=? Order by nomU, prenomU ASC", [id], callback)
    },

    PutUserId:function(id, nom, prenom, mail, promo, callback) {
        return connection.query("update users SET nomU=?, prenomU=?, mailU=?, promotionU=? where id=?", [nom, prenom, mail, promo, id], callback)
    },

    DelUserId:function(id) {
        return connection.query("delete from users where id=?", [id])
    },
};
module.exports=Users;
