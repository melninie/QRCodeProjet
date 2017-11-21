var connection=require('../../config/dbconnection');

var Etudiant={

    ObtSeanceWithMatiereId:function(id, callback) {
        return connection.query("select * from seance s LEFT JOIN matiere m ON s.matiereS=m.idM where idS = ?;", [id], callback)
    },

};
module.exports=Etudiant;
