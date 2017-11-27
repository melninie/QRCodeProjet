var CheckLog = require('../CheckLogin');
var router = require('express').Router();
var Promo = require('../Models/promosModel');
var Matiere = require('../Models/matieresModel');
var Seance = require('../Models/seancesModel');

var async = require('async');

// =====================================
// PROMOTIONS ==========================
// =====================================

router.get('/promotions/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {

    if(req.params.id) {
        if(req.params.id == "create"){
            res.render('Promos/createPromo.ejs', {page_title: "createPromo", chemin:"admin/promotions/"});
        }
        else {
            var query = Promo.ObtPromoId(req.params.id, function(err,rows)
            {
                if(err)
                    res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/promos/" + req.param("id")});
                if(rows.length <= 0){
                    res.render('errorRessource.ejs',{page_title:"Error", ressource:"/admin/promotions/"+req.param("id")});
                }
                res.render('Promos/detailPromo.ejs',{page_title:"detailPromo", promo:rows, chemin:"admin/promotions/"});
            });
        }

    }
    else {
        var query = Promo.ObtAllPromos(function (err, rows) {
            if (err)
                res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/promos/"});

            res.render('Promos/allPromos.ejs', {page_title: "allPromos", promos: rows, chemin:"admin/promotions/"});
        });
    }
});


router.delete('/promotions/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    if(req.param("id")) {
        async.parallel([
            function(parallel_done) {

                var query = Promo.DelPromoId(req.param("id"), function (err, rows) {
                    if (err)
                        res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/promos/" + req.param("id")});

                    parallel_done();

                });
            },
            function(parallel_done) {
                var query2 = Matiere.ObtAllMatieresByPromo(req.param("id"), function (err, rows2) {
                    rows2.forEach(function (element) {
                        console.log(element);
                        var query4 = Seance.DelSeanceByMatiere(element.idM, function (err, rows) {
                            if (err)
                                res.render('errorRequest.ejs', {
                                    page_title: "Error",
                                    ressource: "/admin/matiere/" + req.param("id")
                                });
                        });
                    });

                    var query3 = Matiere.DelMatiereByPromo(req.param("id"), function (err, rows) {
                        if (err)
                            res.render('errorRequest.ejs', {
                                page_title: "Error",
                                ressource: "/admin/promos/" + req.param("id")
                            });
                    });
                });
            }
        ], function(err){
            if(err)
                res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"});
        });
    }
});



router.put('/promotions/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    if (req.param("id")) {

        var nomP = req.body.nom;
        var query = Promo.PutPromoId(req.param("id"), nomP, function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
        });
    }
});

router.post('/promotions', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    var nomP = req.body.nom;
    var query = Promo.AddPromoId(nomP, function (err, rows) {
        if (err)
            res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/promos/"});

        res.redirect('/admin/promotions');
    });
});


module.exports = router;

