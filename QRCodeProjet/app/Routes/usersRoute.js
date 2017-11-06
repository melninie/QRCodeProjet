var User=require('../Models/usersModel');
var CheckLog=require('../CheckLogin');
var router = require('express').Router();

// =====================================
// USERS ===============================
// =====================================
// show the lists of users form

    app.get('/users/:id?', CheckLog, function(req, res)
    {
        if(req.param("id")) {
            var query = User.ObtUserId(req.param("id"), function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );

                res.render('detailUser.ejs',{page_title:"detailUser", data:rows});
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
                res.render('allUsers.ejs',{page_title:"allUsers", etudiants:tabEtu, enseignants:tabEns, administration:tabAdmin, chemin:"users/"});
            });
        }
    });

    app.put('/users/:id?', CheckLog, function(req, res) {
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
    });

    app.delete('/users/:id?', CheckLog, function(req, res)
    {
        console.log("ICI !!");
        console.log(req.param("id"));

        if (req.param("id")) {
            console.log("LA !!")

            var query = User.DelUserId(req.param("id"), function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);


                res.render('allUsers.ejs', {page_title: "allUsers"});
            });
        }
    });

};

