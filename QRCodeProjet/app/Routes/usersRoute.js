var User=require('../Models/usersModel');
var Promo=require('../Models/promosModel');
var CheckLog=require('../CheckLogin');

const fileUpload = require('express-fileupload');
var bcrypt = require('bcrypt-nodejs');

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
                        {
                            res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/"}+ req.param("id"));
                            return false;
                        }
                        if (rows.length <= 0)
                        {
                            res.status(404).render('errorRessource.ejs', {page_title: "Error", role:req.user.roleU, data:rows.length, ressource:"/admin/users/" + req.param("id")});
                            return false;
                        }

                        data.table1 = rows;

                        parallel_done();
                    });
                },
                function(parallel_done) {
                    var query2 = Promo.ObtAllPromos(function (err, rows2) {
                        if (err)
                            res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/" + req.param("id")});

                        data.table2 = rows2;
                        parallel_done();
                    });
                }
            ], function(err){
                if(err)
                    res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/" + req.param("id")});
                else
                    res.status(200).render('Users/detailUser.ejs',{page_title:"detailUser", user:data.table1, promos:data.table2, chemin:"admin/users/"});
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
                    res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/"});

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

                res.status(200).render('Users/allUsers.ejs',{page_title:"allUsers", etudiants:tabEtu, enseignants:tabEns, administration:tabAdmin, session:sessionUser, nbAdmin:lengthResult, chemin:"admin/users/"});
            });
        }
    });

    router.put('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if (req.param("id"))
        {
            var nomU = req.body.nom;
            var prenomU = req.body.prenom;
            var mailU = req.body.mail;
            var promotionU = req.body.promotion;

            var query = User.PutUserId(req.param("id"), nomU, prenomU, mailU, promotionU, function (err, rows) {
            if (err)
                res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/" + req.param("id")});
            });
        }
    });

    router.use(fileUpload());

    router.post('/createUser', function(req, res) {
        var username= req.body.prenom.substring(0, 2) + req.body.nom.substring(0, 4);
        var password= bcrypt.hashSync(req.body.prenom.substring(0, 2) + req.body.nom.substring(0, 4), null, null);  // use the generateHash function in our user model
        var nomU = req.body.nom;
        var prenomU = req.body.prenom;
        var mailU = req.body.mail;
        var roleU = req.body.role;
        var promotionU = null;
        var imgProfileComplement = "";

        if(roleU=="ETUDIANT")
            promotionU=req.body.promotion;

        if (Object.keys(req.files).length !== 0) {
            if(roleU=="ENSEIGNANT")
                imgProfileComplement= "Ens";
            else if(roleU=="ADMIN")
                imgProfileComplement= "Adm";
            else
                imgProfileComplement= promotionU;

            var namefile = nomU+"_"+prenomU+"_"+imgProfileComplement+".jpg";

            var sampleFile = req.files.sampleFile;

            console.log("---------------");
            console.log(namefile);
            console.log(sampleFile);

            sampleFile.mv('./assets/files/imgProfileUsers/' + namefile, function (err) {
                if (err)
                    return res.status(500).send(err);

                console.log('File uploaded!');

                var query = User.AddUser(username, password, prenomU, nomU, mailU, roleU, promotionU, namefile, function (err, rows) {
                    if (err)
                        res.status(500).render('errorRequest.ejs', {
                            page_title: "Error",
                            role: req.user.roleU,
                            ressource: "/admin/users/"
                        });

                    res.status(200).redirect('/admin/users');
                });
            });
        }
        else {
            namefile="profileImgDefault.jpeg";

            var query = User.AddUser(username, password, prenomU, nomU, mailU, roleU, promotionU, namefile, function (err, rows) {
                if (err)
                    res.status(500).render('errorRequest.ejs', {
                        page_title: "Error",
                        role: req.user.roleU,
                        ressource: "/admin/users/"
                    });

                res.status(200).redirect('/admin/users');
            });
        }
    });

    router.post('/upload/:id&:img',  function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res) {
        if (!req.files)
            res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/" + req.param("id")});

        var sampleFile = req.files.sampleFile;
        var namefile = req.param("img")+'.jpg';

        sampleFile.mv('./assets/files/imgProfileUsers/'+namefile, function(err) {
            if (err)
                return res.status(500).send(err);

            console.log('File uploaded!');

            var query = User.PutUserIdImgProfil(req.param("id"), namefile, function (err, rows) {
                if (err)
                    res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/" + req.param("id")});

                res.status(200).redirect('/admin/users');
            });
        });
    });

    router.delete('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
    {
        if(req.param("id")) {
            var query = User.DelUserId(req.param("id"), function (err, rows) {
                if (err)
                    res.status(500).render('errorRequest.ejs', {page_title:"Error", role:req.user.roleU, ressource: "/admin/users/" + req.param("id")});

           });
        }
    });

module.exports = router;

