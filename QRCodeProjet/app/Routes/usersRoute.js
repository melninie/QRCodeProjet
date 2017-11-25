var User=require('../Models/usersModel');
var Promo=require('../Models/promosModel');
var CheckLog=require('../CheckLogin');

var router = require('express').Router();
var async = require('async');

    // =====================================
    // USERS ===============================
    // =====================================

    router.get('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        var data = {};

        if(req.param("id")) {
            async.parallel([
                function(parallel_done) {
                    var query = User.ObtUserId(req.param("id"), function (err, rows) {
                        if (err)
                            console.log("Error Selecting : %s ", err);
                        if (rows.length <= 0)
                            res.render('errorRessource.ejs', {page_title: "Error", data:rows.length, ressource:"/admin/users/" + req.param("id")
                            });

                        data.table1 = rows;

                        parallel_done();
                    });
                },
                function(parallel_done) {
                    var query2 = Promo.ObtAllPromos(function (err, rows2) {
                        if (err)
                            console.log("Error Selecting : %s ", err);

                        data.table2 = rows2;
                        parallel_done();
                    });
                }
            ], function(err){
                if(err)
                    return console.log(err);

                res.render('Users/detailUser.ejs',{page_title:"detailUser", user:data.table1, promos:data.table2, chemin:"admin/users/"});
            });
        }
        else
        {
            var tabEtu = [];
            var tabEns = [];
            var tabAdmin = [];

            var query = User.ObtAllUsers(function(err,rows)
            {
                var sessionUser = req.session.passport.user;
                var lengthResult = 0;

                if(err)
                    console.log("Error Selecting : %s ",err );

                rows.forEach(function(element) {
                    if(element.roleU=="ETUDIANT")
                        tabEtu.push(element);
                    else if(element.roleU=="ENSEIGNANT")
                        tabEns.push(element);
                    else {
                        tabAdmin.push(element);
                        lengthResult++;
                    }
                });

                res.render('Users/allUsers.ejs',{page_title:"allUsers", etudiants:tabEtu, enseignants:tabEns, administration:tabAdmin, session:sessionUser, nbAdmin:lengthResult, chemin:"admin/users/"});
            });
        }
    });

    router.put('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if (req.param("id"))
        {
            console.log(req.body.nom);

            var nomU = req.body.nom;
            var prenomU = req.body.prenom;
            var mailU = req.body.mail;
            var promotionU = req.body.promotion;

            var query = User.PutUserId(req.param("id"), nomU, prenomU, mailU, promotionU, function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);
            });
        }
    });

    router.delete('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if(req.param("id")) {
            var query = User.DelUserId(req.param("id"), function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);

           });
        }
    });

module.exports = router;

