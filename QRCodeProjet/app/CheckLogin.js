// route middleware to make sure

module.exports= function (req, res, next, role)
    {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            if(role == req.user.roleU)
                return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    };
