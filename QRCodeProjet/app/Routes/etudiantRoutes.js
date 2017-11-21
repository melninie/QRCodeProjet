var Etudiant = require('../Models/etudiantModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();

// =====================================
// ETUDIANT ==========================
// =====================================

router.get('/seance/:id?', function(req, res, next) {CheckLog(req, res, next, "ETUDIANT");},function(req, res) {

    if(req.params.id) {
        var query = Etudiant.ObtSeanceWithMatiereId(req.params.id, function(err,rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (rows.length <= 0) {
                res.render('errorRessource.ejs', {
                    page_title: "Error",
                    ressource: "/etudiant/seance/" + req.param("id")
                });
            }

            console.log(rows[0]);

            //vérifications
            //la bonne promo
            if(req.user.promotionU != rows[0].promotionS){

            }
            //l'horaire

            res.render('signalerPresence.ejs',{page_title:"signalerPresence", seance:rows});
        });
    }
});

module.exports = router;

