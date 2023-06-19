const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stuff = require('./models/thing');


//* Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://samuel:siracusa@cluster0.a3bl5lb.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((err) => console.log('Connexion à MongoDB échouée !', err));


const app = express();//creo un oggetto app che mi permette di utilizzare express
app.use(express.json());//uso il metodo json di express per trasformare le richieste in oggetti json
app.use(cors());//uso il metodo cors di express per permettere la comunicazione tra il frontend e il backend perhè sono su porte diverse





app.post('/api/stuff', (req, res) => {
    delete req.body._id;
    //creo un oggetto con i dati ricevuti dalla richiesta
    const thing = new stuff({
        ...req.body
    });
    thing.save()//save prende un parametro, l'oggetto da salvare
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
    stuff.findOne({ _id: req.params.id })//findOne prende un parametro, l'oggetto da cercare
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });



app.get('/api/stuff', (req, res) => {
    stuff.find()//find prende un parametro, l'oggetto da cercare
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});


app.delete('/api/stuff/:id',((req, res, next) => {
    stuff.deleteOne({ _id: req.params.id})//deleteOne prende un parametro, l'oggetto da eliminare
    .then(thing => res.status(200).json({message:"Eliminato!"}))
    .catch(error => res.status(404).json({ error }));
}));

app.put('/api/stuff/:id',((req, res, next) => {
    stuff.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id})//updateOne prende due parametri, il primo è l'oggetto da modificare, il secondo è l'oggetto con le modifiche
    .then(thing => res.status(200).json({message:"Eliminato!"+ thing._id}))
    .catch(error => res.status(404).json({ error }));
}));




module.exports = app;






