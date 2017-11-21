var Seance = require('../Models/seancesModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();

// =====================================
// ETUDIANT ==========================
// =====================================

router.get('/seance', function(req, res, next) {CheckLog(req, res, next, "ENSEIGNANT");},function(req, res) {

        var query = User.ObtAllEtudiant(req.params.id, function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            if(rows.length <= 0) {
                res.render('errorRessource.ejs', {
                    page_title: "Error",
                    ressource: "/enseignant/seance" + req.param("id")
                });
            }
            res.render('validerPresence.ejs',{page_title:"validerPresence", seance:rows});
        });
});

module.exports = router;

