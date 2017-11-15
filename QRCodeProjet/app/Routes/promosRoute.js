var Promo = require('../Models/promosModel');
var CheckLog = require('../CheckLogin');
var router = require('express').Router();

// =====================================
// PROMOTIONS ==========================
// =====================================

router.get('/promotions/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {

    if(req.params.id) {
        if(req.params.id == "create"){
            res.render('createPromo.ejs', {page_title: "createPromo", chemin:"admin/promotions/"});
        }
        else {
            var query = Promo.ObtPromoId(req.params.id, function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );
                if(rows.length <= 0){
                    res.render('errorRessource.ejs',{page_title:"Error", ressource:"/admin/promotions/"+req.param("id")});
                }
                res.render('detailPromo.ejs',{page_title:"detailPromo", promo:rows, chemin:"admin/promotions/"});
            });
        }

    }
    else {
        var query = Promo.ObtAllPromos(function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('allPromos.ejs', {page_title: "allPromos", promos: rows, chemin:"admin/promotions/"});
        });
    }
});


router.delete('/promotions/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
{
    if(req.param("id")) {
        var query = Promo.DelPromoId(req.param("id"), function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

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
            console.log("Error Selecting : %s ", err);

        res.redirect('/admin/promotions');
    });
});


module.exports = router;

