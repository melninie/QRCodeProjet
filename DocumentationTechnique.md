# Documentation technique : 

## ROUTES /enseignant :

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/enseignantRoutes.js  
```js
router.get('/seance', function(req, res, next) {CheckLog(req, res, next, "ENSEIGNANT");},function(req, res)
```
Requête qui renvoie la vue contenant les informations nécessaires pour l’enseignant, ici l’enseignant pourra consulter la vue 
de la fiche de présence en question (séance).

**PUT** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/enseignantRoutes.js  
```js
router.put('/seance/:id?', function(req, res, next){ CheckLog(req, res, next, "ENSEIGNANT");}, function(req, res)
```
Permet à l’enseignant de valider une séance afin de notifier sa présence lors d'un cours. Il peut aussi émettre un commentaire en même 
temps.

## ROUTES /etudiant :

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/etudiantRoutes.js  
```js
router.get('/seance/:id?', function(req, res, next) {CheckLog(req, res, next, "ETUDIANT");},function(req, res) {
```
Requête qui renvoie la vue contenant les informations nécessaire à l’étudiant, ici il aura accès à la vue qui lui permettra de signer 
la fiche de présence.

**POST** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/etudiantRoutes.js    
```js
router.post('/seance/:id?', function(req, res, next) {CheckLog(req, res, next, "ETUDIANT");},function(req, res) {
```
Permet à l’édutiant de modifier une séance afin de valider sa présence lors de cette même séance. Cette route va créer un badge reliant
l'id de l'étudiant à l'id de la séance.

## ROUTES /admin :

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/matieresRoute.js  
```js
router.get('/matieres/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res) {
```
Renvoie toutes les matières contenues dans la base de données et les affichent sous forme de groupes triés par promotion.

**POST** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/matieresRoute.js  
```js
router.post('/matieres',function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l’administrateur de créer une nouvelle matière en fonction d’une promotion déjà existante.

**PUT** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/matieresRoute.js  
```js
router.put('/matieres/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l’administrateur de modifier une matière déjà existante et permet de changer celle-ci de promotion.

**DELETE** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/matieresRoute.js  
```js
router.delete('/matieres/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Permet à l’administrateur de supprimer une matière.

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/promosRoute.js  
```js
router.get('/promotions/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res)
```
Renvoi toutes les promotions contenues dans la base de données et les affichent sous forme de groupes triés par promotion.

**POST** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/promosRoute.js  
```js
router.post('/promotions', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l’administrateur de créer une nouvelle promotion.

**PUT** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/promosRoute.js  
```js
router.put('/promotions/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
``` 
Route qui permet à l'administrateur de modifier une promotion.

**DELETE** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/promosRoute.js  
```js
router.delete('/promotions/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l’administrateur de supprimer une promotion.

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/seancesRoute.js  
```js
router.get('/seances/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l'utilisateur d’accéder à la vue des séances, il lui sera retourné une page contenant l’intégralité 
des séances contenues dans la base de données. Les séances seront regroupées et triées par matières.

**POST** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/seancesRoute.js  
```js
router.post('/seances',function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l’administrateur d’insérer une nouvelle séance dans la base de données.

**PUT** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/seancesRoute.js  
```js
router.put('/seances/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l’administrateur de modifier une séance existant déjà dans le base de données.

**DELETE** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/seancesRoute.js  
```js
router.delete('/seances/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet à l'administrateur de supprimer une séance de la base de données.

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/usersRoute.js  
```js
router.get('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Route qui permet de récupérer la vue utilisateur qui renvoie les différents “users” présent dans la base de données en fonction de 
leurs rôles (étudiants, enseignants ou administration).

**PUT** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/usersRoute.js  
```js
router.put('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Permet à l’administration de modifier les caractéristiques d’un utilisateur, il peut modifier son nom, prénom, mail et promotion dans 
le cas d’un étudiant par exemple.

**DELETE** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/usersRoute.js  
```js
router.delete('/users/:id?', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Permet à l’administration de supprimer un utilisateur dans la base de données.

## ROUTES PRINCIPALES :

### ROUTE Accueil :
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js   
**GET** / :
```js
app.get('/', function(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
});
```
Renvoi vers la vue login afin de se connecter.

### ROUTES login :
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js   
**GET** /login :
```js
app.get('/login', function(req, res) {
	res.render('login.ejs', { message: req.flash('loginMessage') });
});
```
Route Qui affiche une vue indiquant à l’utilisateur de se connecter à l’application.

https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js   
**POST** /login :
```js
app.post('/login', function(req, res) {
	var returnTo = req.session.returnTo||'redirectByRole';
	passport.authenticate('local-login', {
		successRedirect : returnTo,
		failureRedirect : '/login',
		failureFlash : true
	})(req, res	);
});
```
Renvoie le login au serveur et vérifie celui-ci avant de permettre à l’utilisateur de pouvoir se connecter.

### ROUTE redirection :
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js  
**GET** /redirectByRole :
```js
app.get('/redirectByRole', function(req, res) {
	switch(req.user.roleU){
		case "ETUDIANT":
			var returnTo = "profile";
			Break;
		case "ENSEIGNANT":
			var returnTo = "enseignant/seance";
			Break;
		case "ADMINISTRATION":
			var returnTo = "admin/";
			Break;
		}
	res.redirect(returnTo);
});	
```
Après validation du login, cette route va permettre de rediriger l’utilisateur vers la page qui correspond à son rôle 
(Etudiants, Enseignants ou Administration).

### ROUTES utilisateurs :
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js   
**GET** /admin/user/create :
```js
app.get('/admin/users/create', function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function(req, res)
```
Cette route permet à l’administrateur de créer un utilisateur dans la base de données.

https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js   
**POST** /admin/users :
```js
app.post('/admin/users', passport.authenticate('local-signup', {
	successRedirect : '/admin/users',
		failureRedirect : '/admin/users/create',
		failureFlash : true // allow flash messages
	}));
```
Cette route permet de créer un utilisateur en lui associant un nom de compte et un mot de passe.

### ROUTE profile :
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js    
**GET** /profile :
```js
app.get('/profile', function(req, res, next){ CheckLog(req, res, next, "ETUDIANT");}, function(req, res) {
```
Cette route donne accès à la vue profile d’un utilisateur de type étudiant, celui-ci peut ainsi consulter les informations 
le concernant.

### ROUTE accueil administration :
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js    
**GET** /admin :
```js
app.get('/admin',function(req, res, next){ CheckLog(req, res, next, "ADMINISTRATION");}, function (req, res)
```
Cette route donne accès à la vue d’accueil de l’administration lorsqu’un utilisateur authentifié en tant que ADMINSITRATION se connecte.

### ROUTE déconnexion : 
https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/routes.js    
**GET** /logout :
```js
app.get('/logout', function(req, res) 
```
Cette route permet à n’importe quel utilisateur de se déconnecter depuis toutes les vues possédant le bouton déconnexion.

## ROUTES Fiche de présence :

**GET** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/fichePresenceRoutes.js
```js
router.get('/fichePresence/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res)
```
Cette route permet d'afficher le formulaire s'il n'y a pas d'id et dans le cas contraire, il affiche le PDF si y'en a un.
Pour l'instant les routes PDF et fiche de présence ne sont accessibles que par l'administration.

**POST** https://github.com/melninie/QRCodeProjet/blob/master/QRCodeProjet/app/Routes/fichePresenceRoutes.js
```js
router.post('/fichePresence/:id?', function(req, res, next) {CheckLog(req, res, next, "ADMINISTRATION");},function(req, res)
```
Cette route sert a générer le PDF sur le serveur. Route accessible uniquement par l'administration.

## Spécification de l'API REST :

| **HTTP verb** | **URL**                  | **Response URL** | **Response body** | **Reason** |
|-----------|------------------------------|--------------|---------------|--------|
| GET       | /app/Routes/enseignantRoutes | 200          | retourne toutes les séances de l'enseignant|       |
|           |                              | 500          |               | pas de contenu     |
| PUT       | /app/Routes/enseignantRoutes | 500          |               |        |
| GET       | /app/Routes/etudiantRoutes   |              |               |        |
| POST      | /app/Routes/etudiantRoutes   |              |               |        |
| GET       | /app/Routes/matieresRoute    |              |               |        |
| POST      | /app/Routes/matieresRoute    |              |               |        |
| PUT       | /app/Routes/matieresRoute    |              |               |        |
| DELETE    | /app/Routes/matieresRoute    |              |               |        |
| GET       | /app/Routes/promosRoute      |              |               |        |
| POST      | /app/Routes/promosRoute      |              |               |        |
| PUT       | /app/Routes/promosRoute      |              |               |        |
| DELETE    | /app/Routes/promosRoute      |              |               |        |
| GET       | /app/Routes/seancesRoute     |              |               |        |
| POST      | /app/Routes/seancesRoute     |              |               |        |
| PUT       | /app/Routes/seancesRoute     |              |               |        |
| DELETE    | /app/Routes/seancesRoute     |              |               |        |
| GET       | /app/Routes/usersRoute       |              |               |        |
| PUT       | /app/Routes/usersRoute       |              |               |        |
| DELETE    | /app/Routes/usersRoute       |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| POST      | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| POST      | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/routes           |              |               |        |
| GET       | /app/Routes/fichePresenceRoutes |              |               |        |
| POST      | /app/Routes/fichePresenceRoutes |              |               |        |
|           |                              |              |               |        |

## Technologies utilisées : 

Afin de réaliser ce projet nous avons travailler avec divers technologies qui nous ont permis de mener à bien ce projet :
* Nous avons utilisés l'outil **IntelliJ IDEA** qui nous a permis de développer et de faciliter les intéractions avec le serveur
* Afin de garder un oeil sur les changements dans Github, nous avons utilisé l'outil **SmartGit** 
* Nous nous sommes servi de **EasyPHP** et de **PHPMyAdmin** en tant que serveur et de database
* Pour pouvoir communiquer entre nous, nous avons utilisé divers outils comme **Slack** ou **Discord** mais aussi **Asana** qui nous 
a permis de faire un suivi de projet complet
* Nous avons développé ce projet sous **NodeJS** et **EJS**, et nous nous sommes servi de **SQL** afin d'écrire les différentes requètes
* Enfin nous avons utilisé **Boostrap** afin de donner du style à notre site
