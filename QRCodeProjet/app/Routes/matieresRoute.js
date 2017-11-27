var Matiere = require('../Models/matieresModel');
var Promotion = require('../Models/promosModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();
var async = require('async');
var Seance = require('../Models/seancesModel');

// =====================================
// MATIERES ==========================
// =====================================

router.get('/matieres/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {

    var data = {};
    var data2 = {};

    if(req.params.id) {
        if(req.param("id")=="create") {
            var query1 = Promotion.ObtAllPromos(function (err, rows) {
                if (err)
                    res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"}+ req.param("id"));
                if (rows.length <= 0) {
                    res.render('errorRessource.ejs', {
                        page_title: "Error",
                        ressource: "/admin/matieres/" + req.param("id")
                    });
                }
            res.render('Matieres/createMatiere.ejs', {page_title: "createMatiere", promos:rows, chemin:"admin/matieres/"});
            });
        }
        else
        {
            async.parallel([
                function (parallel_done) {
                    var query = Matiere.ObtMatiereId(req.params.id, function (err, rows) {
                        if (err)
                            res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"}+ req.param("id"));
                        if (rows.length <= 0) {
                            res.render('errorRessource.ejs', {
                                page_title: "Error",
                                ressource: "/admin/matieres/" + req.param("id")
                            });
                        }

                        data.table1 = rows;
                        parallel_done();
                    });
                },
                function (parallel_done) {
                    var query1 = Promotion.ObtAllPromos(function (err, rows2) {
                        if (err)
                            res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"}+ req.param("id"));
                        if (rows2.length <= 0) {
                            res.render('errorRessource.ejs', {
                                page_title: "Error",
                                ressource: "/admin/matieres/" + req.param("id")
                            });
                        }
                        data.table2 = rows2;
                        parallel_done();
                    });
                },
            ], function (err) {
                if (err)
                    res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"}+ req.param("id"));

                res.render('Matieres/detailMatiere.ejs', {page_title: "detailMatiere", matieres:data.table1, promos:data.table2, chemin: "admin/matieres/"});
            });
        }
    }
    else
    {
        async.parallel([
            function(parallel_done) {
                var query = Matiere.ObtAllMatieres(function(err,rows)
                {
                    if(err)
                        res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"});

                    data2.table1 = rows;
                    parallel_done();
                });
            },
            function(parallel_done) {
                var query2 = Promotion.ObtAllPromos(function (err, rows2) {
                    if (err)
                        res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"});

                    data2.table2 = rows2;
                    parallel_done();
                });
            }
        ], function(err){
            if(err)
                res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"});

            res.render('Matieres/allMatieres.ejs',{page_title:"allMatieres", matieres:data2.table1, promos:data2.table2, chemin:"admin/matieres/"});
        });
    }
});

router.post('/matieres',function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    console.log("POST MATIERE");

    var query = Matiere.PostMatiere(req.body.nom, req.body.promo, function (err, rows) {
        if (err)
            res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"});

        res.redirect('/admin/matieres');
    });
});

router.put('/matieres/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    if (req.param("id"))
    {
        var nomM = req.body.nom;
        var promotionS = req.body.promo;

        var query = Matiere.PutMatiereId(req.param("id"), nomM, promotionS, function (err, rows) {
            if (err)
                res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"}+ req.param("id"));
        });
    }
});


router.delete('/matieres/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    if(req.param("id")) {
        async.parallel([
            function(parallel_done) {

                var query = Matiere.DelMatiereId(req.param("id"), function (err, rows) {
                    if (err)
                        res.render('errorRequest.ejs', {
                            page_title: "Error",
                            ressource: "/admin/matiere"
                        } + req.param("id"));

                    parallel_done();

                });
            },
            function(parallel_done) {
                var query2 = Seance.DelSeanceByMatiere(req.param("id"), function (err, rows) {
                    if (err)
                        res.render('errorRequest.ejs', {
                            page_title: "Error",
                            ressource: "/admin/matiere/" + req.param("id")
                        });

                    parallel_done();

                });
            }
            ], function(err){
                    if(err)
                        res.render('errorRequest.ejs', {page_title:"Error", ressource: "/admin/matiere"});
        });
    }
});

module.exports = router;

