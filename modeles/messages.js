const mongoose = require("mongoose");


let msgData = mongoose.Schema({
    _id: { type: String, required: false },
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    description: { type: String, required: true },
    langue: { type: String, required: false },
    date: { type: String, required: false },
    commentaire: { type: Array, required: false },
});

let Messages = (module.exports = mongoose.model("messages", msgData));

module.exports.getMsg = (callback, limit) => {
    Messages.find(callback).limit(limit);
};

module.exports.getOneMsg = (query, callback) => {
    let filtre = {titre: query };
    Messages.find(filtre, callback).limit(1);
};
//Recherche a travailler!!!!
module.exports.rechercheMsg = (query, callback) => {
    let filtre = { description:{$regex:query }};
    Messages.find(filtre, callback).sort({date:-1}).limit(250);
};

module.exports.ajoutMsg = (query, callback) => {
    query._id = new mongoose.Types.ObjectId();
    query.commentaire= [];
    query.date=Date.now();
    Messages.create(query, callback);
};

module.exports.deleteMsg = (query, callback) => {
    let filtre = { titre: query };
    Messages.deleteOne(filtre, callback);
};

module.exports.modifierMsg = (query, newMsg, callback) => {
    let filtre = { titre: query };
    let options = {};
    //pas de _id generer auto par mongo dans un update
    let nouveauMsg = {
        titre: newMsg.titre,
        auteur: newMsg.auteur,
        description: newMsg.description
    };
    Usagers.findOneAndUpdate(filtre, nouveauMsg, options, callback);
};