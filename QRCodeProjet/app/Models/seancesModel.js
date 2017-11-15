var connection=require('../../config/dbconnection');

var Seance={
    ObtAllSeances:function(callback)
    {
        return connection.query("select s.*, m.nomM from seance s LEFT JOIN matiere m ON s.matiereS=m.idM Order by m.nomM, s.dateS ASC", callback);
    },

    ObtSeanceId:function(id, callback) {
        return connection.query("select * from seance where idS=?", [id], callback)
    },

    CheckSeance: function(nom, date, hDebut, hFin, matiere, enseignant, callback){
        return connection.query("SELECT * FROM users WHERE nomS=? and dateS=? and heureDebut=? and heureFin=? and matiereS=?, userS=?",[nom, date, hDebut, hFin, matiere, enseignant], callback)
    },

    PostSeance: function(nom, date, hDebut, hFin, matiere, user, callback){
        return connection.query("INSERT INTO users (nomS, dateS, heureDebut, heureFin, matiereS, userS) values (?,?,?,?,?,?)", [nom, date, hDebut, hFin, matiere, user], callback);
    },

    PutSeanceId:function(id, nom, date, hDebut, hFin, matiere, user, callback) {
        return connection.query("update seance SET nomS=?, dateS=?, heureDebut=?, heureFin=?, matiereS=?, userS=? where idS=?", [nom, date, hDebut, hFin, matiere, user, id], callback)
    },

    DelSeanceId:function(id) {
        return connection.query("delete from seance where idS=?", [id])
    },
};
module.exports=Seance;
