var Promo = require('../Models/promosModel');
var Seance = require('../Models/seancesModel');
var CheckLog = require('../CheckLogin');

var router = require('express').Router();
var pdfMaker = require('pdf-maker');
var fs = require('fs');
// =====================================
// ETUDIANT ==========================
// =====================================

router.get('/fichePresence/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {

    if(req.params.id) {
        fs.readFile('./PDF/'+req.params.id+'.pdf', function (err,data){
            res.contentType("application/pdf");
            res.send(data);
        });
    }
    else {
        var query = Promo.ObtAllPromos(function (err, rows) {
            if (err)
                res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/fichePresence/"});
            else
                res.render('FichePresence/formulaire.ejs', {page_title: "fichePresence", promos: rows, chemin:"admin/fichePresence/"});
        });
    }
});

router.post('/fichePresence/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {
    //generer le pdf
    var promo = req.body.promo;
    var date = req.body.date;

    var allSeances = [];
    allSeances["entete"] = [];
    allSeances["etudiants"] = [];
    allSeances["lignes"] = [];
    allSeances["enseignants"] = [];
    var nomPromo;
    var query = Seance.ObtSeancesFiche(promo, date, function(err,rows)
    {
        if(err)
            res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/fichePresence"});

        if(rows.length != 0) {

            nomPromo = rows[0].nomP
            rows.forEach(function (seance, indexS) {
                allSeances["entete"].push(seance.nomM);
                allSeances["enseignants"].push(seance.nomU + " " + seance.prenomU);

                var query2 = Seance.ObtEtudiantEnseignant(seance.idS, function (err2, rows2) {
                    if (err2)
                        res.render('errorRequest.ejs', {page_title: "Error", ressource: "/admin/fichePresence"});

                    rows2.forEach(function (etudiant, indexE) {
                        if (!("etu"+etudiant.id in allSeances["lignes"])) {;
                            allSeances["lignes"]["etu"+etudiant.id] = [];
                            allSeances["etudiants"]["etu"+etudiant.id] = etudiant.nomU + " " + etudiant.prenomU;
                        }

                        var query3 = Seance.ObtBadgeEtuSeance(parseInt(etudiant.id), seance.idS, function (err3, rows3) {
                            if (err3)
                                res.render('errorRequest.ejs', {page_title: "Error", ressource: "/enseignant/seance"});

                            if (rows3.length == 0)
                                allSeances["lignes"]["etu"+etudiant.id].push(0);
                            else
                                allSeances["lignes"]["etu"+etudiant.id].push(1);

                            if((indexE == rows2.length-1) && (indexS == rows.length-1)){

                                var template = './views/FichePresence/recap.ejs';
                                var data = {
                                    allSeances: allSeances,
                                    date:date,
                                    promo:nomPromo
                                };
                                var pdfPath = './PDF/recap'+date+nomPromo+'.pdf';
                                var option = {
                                    paperSize: {
                                        format: 'A4',
                                        orientation: 'portrait',
                                        border: '1.8cm'
                                    }

                                };

                                pdfMaker(template, data, pdfPath, option);

                                res.render('FichePresence/recap.ejs', {
                                    page_title: "fichePresence",
                                    chemin:"admin/fichePresence/",
                                    allSeances: allSeances,
                                    date:date,
                                    promo:nomPromo,
                                    pathFile:pdfPath
                                });
                            }
                        });
                    });
                });
            });


        }
        else {
            res.render('validerPresence.ejs', {
                page_title: "validerPresence", seance: [],
                chemin: "enseignant/seance/"
            });
        }
    });
});

module.exports = router;

