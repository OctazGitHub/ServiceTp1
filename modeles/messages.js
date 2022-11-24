const mongoose = require("mongoose");


let msgData = mongoose.Schema({
    _id: { type: String, required: true },
    titre: { type: String, required: true },
    auteur: { type: String, required: true },
    description: { type: String, required: true },
    langue: { type: String, required: true, default: "francais" },
    date: { type: Date,
        required:false,
        default:Date.now() },
    commentaires: [{ 
    auteur: { type: String,
        default: 'Alain@Gmail.com',
        required:false },
    commentaire: { type: String,
        required:true },
    date: { type: Date,
            required:false,
            default:Date.now()}
         }],
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
    //La recherche ne peut recevoir d'espace dans la query
    let filtre = { description:{$regex:query }};
    Messages.find(filtre, callback).sort({date:-1}).limit(250);
};

module.exports.ajoutMsg = (query, callback) => {
    query._id = new mongoose.Types.ObjectId();
    query.commentaires= Array;
    query.date=Date.now();
    Messages.create(query, callback);
};

module.exports.deleteMsg = (query, callback) => {
    let filtre = { _id: query };
    Messages.deleteOne(filtre, callback);
};

module.exports.modifierMsg = (query, newMsg, callback) => {
    let filtre = { titre: query };
    let options = {};
    //pas de _id generer auto par mongo dans un update
    let nouveauMsg = {
        _id:newMsg._id,
        titre: newMsg.titre,
        auteur: newMsg.auteur,
        description: newMsg.description,
        date: newMsg.date,
        langue: newMsg.langue,
        commentaires: newMsg.commentaires
    };
    Usagers.findOneAndUpdate(filtre, nouveauMsg, options, callback);
};