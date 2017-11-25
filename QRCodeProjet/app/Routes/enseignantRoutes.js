var Seance = require('../Models/seancesModel');
var CheckLog = require('../CheckLogin');

var router = require('express').Router();
var moment = require('moment');

// =====================================
// ETUDIANT ==========================
// =====================================

router.get('/seance', function(req, res, next) {CheckLog(req, res, next, "ENSEIGNANT");},function(req, res)
{
    var query = Seance.ObtSeanceEnseignant(req.user.id, function(err,rows)
    {
        if(err)
            console.log("Error Selecting : %s ",err );
        if(rows.length <= 0)
            res.render('errorRessource.ejs', { page_title: "Error", ressource: "/enseignant/seance" });

        rows.forEach(function (element) {
            element.dateS = element.dateS.getUTCFullYear()+"-"+(element.dateS.getUTCMonth()+1)+"-"+element.dateS.getDate();
        });


        var query2 = Seance.ObtEtudiantEnseignant(rows[0].idS, function(err,rows2)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            if(rows2.length <= 0)
                res.render('errorRessource.ejs', { page_title: "Error", ressource: "/enseignant/seance" });

            var rowsbadge = [];

            rows2.forEach(function (element)
            {
                var query3 = Seance.ObtBadgeEtuSeance(element.id, rows[0].idS, function (err, rows3)
                {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    if(rows3.length==0)
                        rowsbadge.push(0);
                    else
                        rowsbadge.push(1);

                    console.log(rows3);

                    if(rowsbadge.length == rows2.length)
                    {
                        res.render('validerPresence.ejs', { page_title: "validerPresence", seance: rows,
                            etudiants: rows2, badge: rowsbadge, chemin:"enseignant/seance/" });
                    }
                });
            });
        });
    });
});

router.put('/seance/:id?', function(req, res, next){ CheckLog(req, res, next, "ENSEIGNANT");}, function(req, res)
{
    if (req.param("id"))
    {
        var commentaire = req.body.commentaire;
        var id = req.param("id");

        var query = Seance.ValiderSeance(id, commentaire, function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
        });
    }
});



module.exports = router;

