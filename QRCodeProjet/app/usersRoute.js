var User=require('../Models/usersModel');

// app/usersRoute.js
module.exports = function(app, passport) {

    // =====================================
    // USERS ===============================
    // =====================================
    // show the lists of users form

    exports.list = function(req, res){

        req.getConnection(function(err,connection){

            var query = User.ObtAllUsers(function(err,rows)
            {
                if(err)
                    console.log("Error Selecting : %s ",err );

                res.render('allUsers.ejs',{page_title:"AllUsers", data:rows});
            });
        });
    };

    app.get('/users', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('AllUsers.ejs', { });
    });

};

