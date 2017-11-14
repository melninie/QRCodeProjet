var connection=require('../../config/dbconnection');

var Matiere={

    ObtAllMatieres:function(callback)
    {
        return connection.query("select * from matiere", callback);
    },

    ObtMatiereId:function(id, callback)
    {
        return connection.query("select * from matiere where idP=?", [id], callback);
    },

    DelMatiereId:function(id) {
        return connection.query("delete from matiere where idP=?", [id])
    }

};
module.exports=Matiere;