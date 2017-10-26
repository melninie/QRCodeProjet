var User=require('./Models/usersModel');
var CheckLog=require('./CheckLogin');

// app/usersRoute.js
module.exports = function(app, passport) {

    // =====================================
    // USERS ===============================
    // =====================================
    // show the lists of users form

    app.get('/users', CheckLog, function(req, res) {

        var query = User.ObtAllUsers(function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('allUsers.ejs',{page_title:"allUsers", data:rows});
        });
    });
};

