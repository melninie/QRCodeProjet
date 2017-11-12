var User=require('../Models/usersModel');
var CheckLog=require('../CheckLogin');
var router = require('express').Router();

// =====================================
// USERS ===============================
// =====================================
// show the lists of users form

    router.get('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if(req.param("id")) {
            var query = User.ObtUserId(req.param("id"), function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );
                if(rows.length<=0)
                {
                    res.render('errorRessource.ejs',{page_title:"Error", ressource:"/admin/users/"+req.param("id")});
                }
                res.render('detailUser.ejs',{page_title:"detailUser", user:rows});
            });
        }
        else
        {
            var tabEtu = [];
            var tabEns = [];
            var tabAdmin = [];

            var query = User.ObtAllUsers(function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );

                rows.forEach(function(element) {
                    if(element.roleU=="ETUDIANT")
                        tabEtu.push(element);
                    else if(element.roleU=="ENSEIGNANT")
                        tabEns.push(element);
                    else
                        tabAdmin.push(element);
                });
                res.render('allUsers.ejs',{page_title:"allUsers", etudiants:tabEtu, enseignants:tabEns, administration:tabAdmin, chemin:"admin/users/"});
            });
        }
    });
/*
    router.put('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMIN");}, function(req, res)
    {
        if (req.param("id")) {

            var form = req.body;
            var nomU = form.nomU;
            var prenomU = form.prenomU;
            var mailU = form.mailU;
            var promotionU = form.promotionU;

            var query = User.PutUserId(req.param("id"), nomU, prenomU, mailU, promotionU, function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('detailUser.ejs', {page_title: "detailUser"});
            });
        }
    });*/

    router.delete('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if(req.param("id")) {
            var query = User.DelUserId(req.param("id"), function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('allUsers.ejs', {page_title: "allUsers"});
           });
        }

        //req.method = "GET";
        //res.redirect('localhost:8080/admin/users');
    });

module.exports = router;

