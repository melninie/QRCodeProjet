var Matiere = require('../Models/matieresModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();

// =====================================
// MATIERES ==========================
// =====================================

router.get('/matieres/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {

    if(req.params.id) {
        var query = Matiere.ObtMatiereId(req.params.id, function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );
            if(rows.length <= 0){
                res.render('errorRessource.ejs',{page_title:"Error", ressource:"/admin/matieres/"+req.param("id")});
            }
            res.render('detailMatiere.ejs',{page_title:"detailMatiere", matieres:rows});
        });
    }
    else {
        var query = Matiere.ObtAllMatieres(function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('allMatieres.ejs', {page_title: "allMatieres", matieres: rows, chemin:"admin/matieres/"});
        });
    }
});


router.delete('/matieres/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    if(req.param("id")) {
        var query = Matiere.DelMatiereId(req.param("id"), function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

        });
    }
});

module.exports = router;

