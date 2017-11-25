var Etudiant = require('../Models/etudiantModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();
var format = require('date-format');
var async = require('async');

// =====================================
// ETUDIANT ==========================
// =====================================

router.get('/seance/:id?', function(req, res, next) {CheckLog(req, res, next, "ETUDIANT");},function(req, res) {

    if(req.params.id) {
        var data = {};
        async.parallel([
            function (parallel_done) {
                var query1 = Etudiant.ObtSeanceWithMatiereId(req.params.id, function(err,rows) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    data.seance = rows;
                    parallel_done();
                });
            },
            function (parallel_done) {
                var query2 = Etudiant.PeutSigner(req.params.id, req.user.id, function (err, rows2) {
                    if (err)
                        console.log("Error Selecting : %s ", err);
                    if (rows2.length <= 0) {
                        data.dejaPresent = false;
                    }
                    else {
                        data.dejaPresent = true;
                    }
                    parallel_done();
                });
            }
        ], function (err) {
            if (err)
                return console.log(err);

            if (data.seance.length <= 0) {
                res.render('errorRessource.ejs', {
                    page_title: "Error",
                    ressource: "/etudiant/seance/" + req.param("id")
                });
            }
            else {
                data.seance = data.seance[0]; //on ne garde que la premiere ligne
            }

            //vérifications promo
            if(req.user.promotionU != data.seance.promotionS){
                res.render('errorRessource.ejs', {
                    page_title: "Error",
                    ressource: "/etudiant/seance/" + req.param("id")
                });
            }
            //vérifications horaire
            var heure = format.asString('hh:mm', new Date());
            var date = format.asString('yyyy-MM-dd', new Date());
            var dateSeance = format.asString('yyyy-MM-dd', data.seance.dateS);
            var heureDebut = format.asString('hh:mm', data.seance.heureDebut);
            var heureFin = format.asString('hh:mm', data.seance.heureFin);

            var peutSigner = false;
            if((date == dateSeance) && (heureDebut <= heure && heure <= heureFin) && !data.dejaPresent){
                peutSigner = true;
            }

            res.render('Etudiants/signalerPresence.ejs',{
                page_title:"signalerPresence",
                format:format,
                peutSigner : peutSigner,
                dejaPresent: data.dejaPresent,
                seance:data.seance,
                chemin: ("etudiant/seance/"+data.seance.idS)}
                );
        });
    }
});

router.post('/seance/:id?', function(req, res, next) {CheckLog(req, res, next, "ETUDIANT");},function(req, res) {

    if(req.params.id) {
        var seance = req.params.id;
        var utilisateur = req.user.id;
        var query = Etudiant.Signer(seance, utilisateur, function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.redirect('/etudiant/seance/'+req.params.id);
        });
    }
});

module.exports = router;

