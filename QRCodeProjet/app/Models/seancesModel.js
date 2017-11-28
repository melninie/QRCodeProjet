var connection=require('../../config/dbconnection');

var Seance={
    ObtAllSeances:function(callback)
    {
        return connection.query("select s.*, m.nomM from seance s LEFT JOIN matiere m ON s.matiereS=m.idM Order by m.nomM, s.dateS ASC", callback);
    },

    ObtSeanceId:function(id, callback) {
        return connection.query("select * from seance where idS=?", [id], callback)
    },

    ObtSeancesFiche:function(idPromo, date, callback){
        return connection.query("SELECT s.idS, s.nomS, s.dateS, s.heureDebut, s.heureFin, s.valideS, m.idM, m.nomM, p.idP, p.nomP, u.nomU, u.prenomU "
            + "from seance s "
            + "inner join matiere m on s.matiereS=m.idM "
            + "inner join users u on s.userS=u.id "
            + "inner join promotion p on m.promotionS=p.idP "
            + "where s.dateS=? and idP=? "
            + "Order By s.heureDebut", [date, idPromo], callback);
    },

    ObtSeanceEnseignant:function(idEnseignant, callback){
        return connection.query("SELECT s.idS, s.nomS, s.dateS, s.heureDebut, s.heureFin, s.valideS, "
            + "m.idM, m.nomM, "
            + "p.idP, p.nomP "
            + "from seance s "
            + "inner join matiere m on s.matiereS=m.idM "
            + "inner join promotion p on m.promotionS=p.idP "
            + "where s.userS=? and s.valideS=0 Order By s.dateS, s.heureFin LIMIT 1", [idEnseignant], callback);
    },

    ObtEtudiantEnseignant:function(idSeance, callback){
        return connection.query("SELECT u.id, u.nomU, u.prenomU from seance s "
            + "inner join matiere m on s.matiereS=m.idM "
            + "inner join promotion p on m.promotionS=p.idP "
            + "inner join users u on p.idP=u.promotionU "
            + "where s.idS=? Order By u.nomU, u.prenomU", [idSeance], callback);
    },

    ObtBadgeEtuSeance:function(idEtudiant, idSeance, callback){
        return connection.query("SELECT * from badge where utilisateurB=? and seanceB=?", [idEtudiant, idSeance], callback);
    },

    CheckSeance: function(nom, date, hDebut, hFin, matiere, enseignant, callback){
        return connection.query("SELECT * FROM seance WHERE nomS=? and dateS=? and heureDebut=? and heureFin=? and matiereS=?, userS=?",[nom, date, hDebut, hFin, matiere, enseignant], callback)
    },

    PostSeance: function(nom, date, hDebut, hFin, matiere, user, callback){
        return connection.query("INSERT INTO seance (nomS, dateS, heureDebut, heureFin, matiereS, userS) values (?,?,?,?,?,?)", [nom, date, hDebut, hFin, matiere, user], callback);
    },

    PutSeanceId:function(id, nom, date, hDebut, hFin, commentaire, matiere, user, callback) {
        return connection.query("update seance SET nomS=?, dateS=?, heureDebut=?, heureFin=?, commentaire=?, matiereS=?, userS=? where idS=?", [nom, date, hDebut, hFin, commentaire, matiere, user, id], callback)
    },

    ValiderSeance:function(id, commentaire, callback) {
        return connection.query("update seance SET commentaire=?, valideS=1 where idS=?", [commentaire, id], callback)
    },

    DelSeanceId:function(id) {
        return connection.query("delete from seance where idS=?", [id])
    },

    DelSeanceByMatiere : function (id) {
        return connection.query("delete from seance where matiereS=?", [id])
    }
};
module.exports=Seance;
