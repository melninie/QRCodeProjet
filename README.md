# QRCodeProjet

## Présentation du projet :  

Ce projet sera suivi par une équipe de la MIAGE d'Evry composé de :  
* DE MARTINO Nicolas  
* GALVAN Mélanie  
* VERNEYRE Sébastien 
  
Ce projet consiste à mettre en place une application qui permettra de dématérialiser la notion de “feuille de présence”.  

A l’aide de la technologie QR Code, le serveur pourra générer automatiquement (avec un planificateur de tâches : node-cron) des QR Codes (avant la 1ère plage horaire de cours) qui changeront pour chaque heure de cours en fonction de l’emploi du temps de chaque professeur (emploi du temps renseigné dans la bdd ; L’objectif suivant étant de le lié au VT d’Evry). Une fois cette action terminée, le serveur enverra un mail aux enseignants contenant les QR codes leurs correspondants. Ce code sera affiché par le professeur à chaque début de plage horaire. Les élèves devront scanner ce code à chaque début de plage horaire afin de notifier leur présence en cours.  

Lorsque l’on scanne le QR Code, celui-ci nous renvoie une URL contenant toutes les informations cryptées (afin d’éviter toute fraude des étudiants) sur la séance et qui permet à l’étudiant de signaler sa présence. Les chaînes de caractères cryptées seront stockées dans la base de données et seront “mappées” avec les informations correspondantes.    

Lorsque l’étudiant scanne le QR Code sur le poste de l’enseignant (ou l’image qu’il aura imprimé), il est redirigé sur une page confirmant sa présence à la séance (rappel des informations). Il obtiendra le statut “présent”. Flasher de nouveau le QR Code (dans la même plage horaire) ne changera rien. Sur le poste de l’enseignant, il y aura d’un côté le QR Code à scanner et de l’autre la liste des étudiants (mise à jour après chaque scannage).  

QR Code est valide seulement pour une plage horaire, en dehors de cette plage, le Serveur n’en prendra pas compte.  
  
Ci-dessous un schéma qui résume le déroulement du processus réalisé :
  
![Déroulement du processus](processus.png)   
  
Ci-après le schéma de la base de données : 
  
![Base de données](Screenshot_6.png)
  
Afin de faire une prévisualisation de l'application, nous avons créé 2 maquettes représentant,  
La page de connexion :  
  
![Page de connexion](Page_de_connexion.png)
  
La feuille de présence dématerialisé :
  
![Feuille](Feuille_de_présence.png)  

