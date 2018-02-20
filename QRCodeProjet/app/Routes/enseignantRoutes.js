var Seance = require('../Models/seancesModel');
var CheckLog = require('../CheckLogin');

var router = require('express').Router();
var moment = require('moment');

// =====================================
// ENSEIGNANT ==========================
// =====================================

router.get('/seance', function(req, res, next) {CheckLog(req, res, next, "ENSEIGNANT");},function(req, res)
{

    /*var rows =*/ FactoryEnseignant(req, res, 'Enseignant/validerPresence.ejs');

    /*var query = Seance.ObtSeanceEnseignant(req.user.id, function(err,rows)
    {
        if(err)
            res.status(500).render('errorRequest.ejs', {page_title:"Error", ressource: "/enseignant/seance"});
        if(rows.length != 0) {

            rows.forEach(function (element) {
                element.dateS = moment(element.dateS).format('YYYY-MM-DD');
            });


            var query2 = Seance.ObtEtudiantEnseignant(rows[0].idS, function (err, rows2) {
                if (err)
                    res.status(500).render('errorRequest.ejs', {page_title: "Error", ressource: "/enseignant/seance"});

                var rowsbadge = [];

                rows2.forEach(function (element) {
                    var query3 = Seance.ObtBadgeEtuSeance(element.id, rows[0].idS, function (err, rows3) {
                        if (err)
                            res.status(500).render('errorRequest.ejs', {page_title: "Error", ressource: "/enseignant/seance"});
                        if (rows3.length == 0)
                            rowsbadge.push(0);
                        else
                            rowsbadge.push(1);

                        if (rowsbadge.length == rows2.length) {
                            res.status(200).render('Enseignant/validerPresence.ejs', {
                                page_title: "validerPresence", seance: rows,
                                etudiants: rows2, badge: rowsbadge, chemin: "enseignant/seance/"
                            });
                        }
                    });
                });
            });
        }
        else {
            res.status(200).render('Enseignant/validerPresence.ejs', {
                page_title: "validerPresence", seance: [],
                chemin: "enseignant/seance/"
            });
        }
    });*/
});

router.put('/seance/:id?', function(req, res, next){ CheckLog(req, res, next, "ENSEIGNANT");}, function(req, res)
{
    if (req.param("id"))
    {
        var commentaire = req.body.commentaire;
        var id = req.param("id");

        var query = Seance.ValiderSeance(id, commentaire, function (err, rows) {
            if (err)
                res.status(500).render('errorRequest.ejs', {page_title:"Error", ressource: "/enseignant/seance"}+ req.param("id"));
        });
    }
});

router.get('/listEtuStandard', function(req, res, next) {CheckLog(req, res, next, "ENSEIGNANT");}, function(req, res) {
    /*var rows =*/ FactoryEnseignant(req, res, 'Enseignant/listEtuStandard.ejs');
});
router.get('/listEtuTrombinoscope', function(req, res, next) {CheckLog(req, res, next, "ENSEIGNANT");}, function(req, res) {
    /*var rows =*/ FactoryEnseignant(req, res, 'Enseignant/listEtuTrombinoscope.ejs');
});


    module.exports = router;

function FactoryEnseignant (req, res, vue)
{
    var query = Seance.ObtSeanceEnseignant(req.user.id, function(err,rows)
    {
        if(err)
            res.status(500).render('errorRequest.ejs', {page_title:"Error", ressource: "/enseignant/seance"});
        if(rows.length != 0) {

            rows.forEach(function (element) {
                element.dateS = moment(element.dateS).format('YYYY-MM-DD');
            });


            var query2 = Seance.ObtEtudiantEnseignant(rows[0].idS, function (err, rows2) {
                if (err)
                    res.status(500).render('errorRequest.ejs', {page_title: "Error", ressource: "/enseignant/seance"});

                var rowsbadge = [];

                rows2.forEach(function (element) {
                    var query3 = Seance.ObtBadgeEtuSeance(element.id, rows[0].idS, function (err, rows3) {
                        if (err)
                            res.status(500).render('errorRequest.ejs', {page_title: "Error", ressource: "/enseignant/seance"});
                        if (rows3.length == 0)
                            rowsbadge.push(0);
                        else
                            rowsbadge.push(1);

                        if (rowsbadge.length == rows2.length) {
                            res.status(200).render(vue, {
                                page_title: "validerPresence", seance: rows,
                                etudiants: rows2, badge: rowsbadge, chemin: "enseignant/seance/"
                            });
                        }
                    });
                });
            });
        }
        else {
            res.status(200).render(vue, {
                page_title: "validerPresence", seance: [],
                chemin: "enseignant/seance/"
            });
        }
    });
}