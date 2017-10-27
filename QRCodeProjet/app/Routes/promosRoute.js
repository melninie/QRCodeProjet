var Promo = require('../Models/promosModel');
var CheckLog = require('../CheckLogin');

// app/usersRoute.js
module.exports = function(app, passport) {

    // =====================================
    // USERS ===============================
    // =====================================
    // show the lists of users form

    app.get('/promotions/:id?', CheckLog, function(req, res, next) {CheckLog(req, res, next, "ADMIN");},function(req, res) {

        if(req.params.id) {
            var query = Promo.ObtPromoId(req.params.id, function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );

                if(rows){
                    var test = 1;
                }
                else{
                    var test = 0;
                }
                res.render('detailPromo.ejs',{page_title:"detailUser", promo:rows[0], test:test});
            });
        }
        else {
            var query = Promo.ObtAllPromos(function (err, rows) {
                if (err)
                    console.log("Error Selecting : %s ", err);

                res.render('allPromos.ejs', {page_title: "allPromos", promos: rows});
            });
        }
    });
};
