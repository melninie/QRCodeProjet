var Etudiant = require('../Models/etudiantModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();

// =====================================
// ETUDIANT ==========================
// =====================================

router.get('/seance/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {

    if(req.params.id) {
        var query = Etudiant.ObtEtuId(req.params.id, function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            if(rows.length <= 0) {
                res.render('errorRessource.ejs', {
                    page_title: "Error",
                    ressource: "/etudiant/promotions/" + req.param("id")
                });
            }
            res.render('signalerPresence.ejs',{page_title:"signalerPresence", seance:rows});
        });
    }
    /*else {
        var query = Etudiant.ObtAllPromos(function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('signalerPresence.ejs', {page_title: "signalerPresence", promos: rows, chemin:"admin/promotions/"});
        });
    }

    res.render('signalerPresence.ejs', {page_title: "signalerPresence", /!*promos: rows,*!/ chemin:"etudiant/seance/"});*/

});

module.exports = router;

