var User=require('../Models/usersModel');
var CheckLog=require('../CheckLogin');
var router = require('express').Router();

// =====================================
// USERS ===============================
// =====================================
// show the lists of users form

router.get('/users', function(req, res, next) {CheckLog(req, res, next, "ADMIN");},function(req, res) {

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
            res.render('allUsers.ejs',{page_title:"allUsers", etudiants:tabEtu, enseignants:tabEns, administration:tabAdmin});
    });
});

module.exports = router;

