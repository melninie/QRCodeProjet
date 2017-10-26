var User=require('./Models/usersModel');

// app/usersRoute.js
module.exports = function(app, passport) {

    // =====================================
    // USERS ===============================
    // =====================================
    // show the lists of users form

    exports.list = function(req, res){


    };

    app.get('/users', function(req, res) {

        var query = User.ObtAllUsers(function(err,rows)
        {
            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('allUsers.ejs',{page_title:"allUsers", data:rows});
        });
    });
};

