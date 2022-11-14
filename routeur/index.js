const express = require("express");
const router = express.Router();
const Messages = require("../modeles/messages.js");


router.get('/client_web2.html', (requete, reponse) => {
  afficherPageWeb('client_web.html2', reponse);
});


router.get('/client_web.html', (requete, reponse) => {
  afficherPageWeb('client_web.html', reponse);
});

function afficherPageWeb(filename, reponse){
  const fs= require('fs');
  const path= require('path');
  filename = path.join(__dirname,'..', '/', filename);
  fs.readFile(filename, (err, contenu) => {
    if (err) {
      reponse.status(500).send("Erreur serveur Web"+err.code);
    }else {
    reponse.status(200).set({'Content-type': 'text/html'}).send(contenu);
    }
  });
}

router.get("/api/messages", (requete, reponse) => {
  //requete a mongoDB pour les messages
  Messages.getMsg((err, msg) => {
    if (err) throw err;
    reponse.json(msg);
  }, 25);
});

router.get("/api/messages/recherche/:texte", (requete, reponse) => {
  //requete pour recherche a mongoDB pour les messages
Messages.rechercheMsg(requete.params.texte,(err, msg) => {
  if (err) throw err;
  reponse.json(msg);
 });
});

router.get("/api/messages/:titre", (requete, reponse) => {
  //requete a mongoDB pour un seul livre with id
  Messages.getOneMsg(requete.params.titre, (err, msg) => {
    if (err) throw err;
    reponse.json(msg);
  });
});
router.post("/api/messages", (requete, reponse) => {
  let msg = requete.body;
  Messages.ajoutMsg(msg, (err, msg) => {
    if (err) throw err;
    reponse.json(msg);
  });
});
router.delete("/api/messages/:titre", (requete, reponse) => {
  //requete a mongoDB pour supprimer un seul msg
  Messages.deleteMsg(requete.params.titre, (err, titre) => {
    if (err) throw err;
    reponse.json(titre);
  });
});

router.put("/api/messages/:titre", (requete, reponse) => {
  //requete a mongoDB pour modifier un seul msg
  let newMsg = requete.body;
  Messages.modifierMsg(requete.params.titre, newtitre, (err, msg) => {
    if (err) throw err;
    reponse.json(msg);
  });
});
router.get("/", (requete, response) => {
  response.send("Utilisez /api/messages pour faire un GET des messages");
});

module.exports = router;
