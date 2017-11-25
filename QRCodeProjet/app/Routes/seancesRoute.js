
var User = require('../Models/usersModel');
var Matiere=require('../Models/matieresModel');
var Seance=require('../Models/seancesModel');
var CheckLog=require('../CheckLogin');

var moment = require('moment');
var router = require('express').Router();
var async = require('async');

// =====================================
// Seances ===============================
// =====================================

    router.get('/seances/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        var data = {};
        var data2 = {};

        if(req.param("id")) {
            if(req.param("id")=="create") {
                async.parallel([
                    function (parallel_done) {
                        var query1 = Matiere.ObtAllMatieres(function (err, rows) {
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            if (rows.length <= 0) {
                                res.render('errorRessource.ejs', {
                                    page_title: "Error",
                                    ressource: "/admin/seances/" + req.param("id")
                                });
                            }

                            data.table1 = rows;
                            parallel_done();
                        });
                    },
                    function (parallel_done) {
                        var query2 = User.ObtAllEnseignants(function (err, rows2) {
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            if (rows2.length <= 0) {
                                res.render('errorRessource.ejs', {
                                    page_title: "Error",
                                    ressource: "/admin/seances/" + req.param("id")
                                });
                            }

                            data.table2 = rows2;
                            parallel_done();
                        });
                    }
                ], function (err) {
                    if (err)
                        return console.log(err);

                    res.render('./Seances/createSeance.ejs', {page_title: "createSeance", matieres:data.table1, enseignants:data.table2, chemin:"admin/seances/"});
                });
            }
            else {
                async.parallel([
                    function (parallel_done) {
                        var query = Seance.ObtSeanceId(req.param("id"), function (err, rows) {
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            if (rows.length <= 0)
                                res.render('errorRessource.ejs', {
                                    page_title: "Error",
                                    ressource: "/admin/seances/" + req.param("id")
                                });

                            rows.forEach(function (element) {
                                element.dateS = element.dateS.getUTCFullYear()+"-"+(element.dateS.getUTCMonth()+1)+"-"+element.dateS.getDate();
                            });

                            data.table1 = rows;
                            parallel_done();
                        });
                    },
                    function (parallel_done) {
                        var query2 = Matiere.ObtAllMatieres(function (err, rows2) {
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            if (rows2.length <= 0) {
                                res.render('errorRessource.ejs', {
                                    page_title: "Error",
                                    ressource: "/admin/seances/" + req.param("id")
                                });
                            }

                            data.table2 = rows2;
                            parallel_done();
                        });
                    },
                    function (parallel_done) {
                        var query2 = User.ObtAllEnseignants(function (err, rows3) {
                            if (err)
                                console.log("Error Selecting : %s ", err);
                            if (rows3.length <= 0) {
                                res.render('errorRessource.ejs', {
                                    page_title: "Error",
                                    ressource: "/admin/seances/" + req.param("id")
                                });
                            }

                            data.table3 = rows3;
                            parallel_done();
                        });
                    }
                ], function (err) {
                    if (err)
                        return console.log(err);

                    res.render('./Seances/detailSeance.ejs', {page_title: "detailSeance", seance: data.table1, matieres: data.table2, enseignants: data.table3, chemin: "admin/seances/"});
                });
            }
        }
        else
        {
            async.parallel([
                function(parallel_done) {
                    var query = Seance.ObtAllSeances(function(err,rows)
                    {
                        if(err)
                            console.log("Error Selecting : %s ",err );
                        if (rows.length <= 0)
                            res.render('errorRessource.ejs', {page_title: "Error", ressource: "/admin/seances/" + req.param("id")
                            });

                        rows.forEach(function (element) {
                            element.dateS = element.dateS.getDate()+"-"+(element.dateS.getUTCMonth()+1)+"-"+element.dateS.getUTCFullYear();
                        });

                        data2.table1 = rows;
                        parallel_done();
                    });
                },
                function(parallel_done) {
                    var query2 = Matiere.ObtAllMatieres(function (err, rows2) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        if(rows2.length<=0)
                        {
                            res.render('errorRessource.ejs',{page_title:"Error", ressource:"/admin/seances/"+req.param("id")});
                        }

                        data2.table2 = rows2;
                        parallel_done();
                    });
                }
            ], function(err){
                if(err)
                    return console.log(err);

                res.render('./Seances/allSeances.ejs',{page_title:"allSeance", seances:data2.table1, matieres:data2.table2, chemin:"admin/seances/", moment: moment});
            });
        }
    });

    router.post('/seances',function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
/*        var query = Seance.CheckSeance(req.body.nom, req.body.date, req.body.hDebut, req.body.hFin, req.body.matiere, req.body.enseignants, function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);
            if (rows.length)
                console.log("That mail is already taken.");
            else
            {*/
                var query = Seance.PostSeance(req.body.nom, req.body.date, req.body.hDebut, req.body.hFin, req.body.matiere, req.body.user, function (err, rows) {
                    if (err)
                        console.log("Error Selecting : %s ", err);

                    res.redirect('/admin/seances');

                });
 /*           }
        });*/
    });

    router.put('/seances/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if (req.param("id"))
        {
            var nomS = req.body.nom;
            var dateS = req.body.date;
            var heureDebut = req.body.hDebut;
            var heureFin = req.body.hFin;
            var commentaire = req.body.commentaire;
            var matiere = req.body.matiere;
            var user = req.body.user;

            var query = Seance.PutSeanceId(req.param("id"), nomS, dateS, heureDebut, heureFin, commentaire, matiere, user, function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
            });
        }
    });

    router.delete('/seances/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if(req.param("id")) {
            var query = Seance.DelSeanceId(req.param("id"), function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
           });
        }
    });

module.exports = router;

