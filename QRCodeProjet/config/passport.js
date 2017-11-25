// package config/passport.js

var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = require('./dbconnection');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    // =========================================================================
    // SIGNUP ============================================================
    // =========================================================================

    passport.use(
        'local-signup',
        new LocalStrategy({
            // La stragéie se base sur le mail et le mot de passe de l'utilisateur
            // passReqToCallback nous permet de renvoyer la totalité de la demande au rappel
            usernameField : 'mail',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, mail, password, done) {
            // Grce âu mail de l'utilisateur, nous déterminons s'il extiste déjà
            // Si oui, nous renvoyons un message
            // Sinon nous l'ajoutons à la base de données
            // le username est construit à partir du nom et du prénom de l'utilisateur
            // idem pour le mot de passe

            connection.query("SELECT * FROM users WHERE mailU = ?",[mail], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length)
                    return done(null, false, req.flash('signupMessage', 'That mail is already taken.'));
                else
                {
                    var newUserMysql = {
                        username: req.body.prenom.substring(0, 2) + req.body.nom.substring(0, 4),
                        password: bcrypt.hashSync(req.body.prenom.substring(0, 2) + req.body.nom.substring(0, 4), null, null),  // use the generateHash function in our user model
                        prenomU: req.body.prenom,
                        nomU: req.body.nom,
                        mailU: req.body.mail,
                        roleU: req.body.role,
                        promotionU: req.body.promotion
                    };

                    var insertQuery = "INSERT INTO users ( username, password, prenomU, nomU, mailU, roleU, promotionU ) values (?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password, newUserMysql.prenomU, newUserMysql.nomU, newUserMysql.mailU, newUserMysql.roleU, newUserMysql.promotionU, ],function(err, rows) {

                    return done(null, req.user);

                    });
                }
            });
        })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(
        'local-login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){

                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);
            });
        })
    );
};
