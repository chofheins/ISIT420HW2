var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Anime = require("../Anime");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
 "mongodb+srv://MongoUser:Murphy513@connercluster.rwxds.mongodb.net/AnimeDB?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);



/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

/* GET all Anime */
router.get('/Anime', function(req, res) {
  // find {  takes values, but leaving it blank gets all}
  Anime.find({}, (err, AllAnime) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(AllAnime);
  });
});




/* post a new Anime and push to Mongo */
router.post('/NewAnime', function(req, res) {

    let oneNewAnime = new Anime(req.body);  // call constuctor in Anime code that makes a new mongo Anime object
    console.log(req.body);
    oneNewAnime.save((err, anime) => {
      if (err) {
        res.status(500).send(err);
      }
      else {
      console.log(anime);
      res.status(201).json(anime);
      }
    });
});


router.delete('/DeleteAnime/:id', function (req, res) {
  Anime.deleteOne({ _id: req.params.id }, (err, note) => { 
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Anime successfully deleted" });
  });
});


router.put('/UpdateAnime/:id', function (req, res) {
  Anime.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, summary: req.body.summary, ranking: req.body.ranking,   watched: req.body.watched },
   { new: true },
    (err, anime) => {
      if (err) {
        res.status(500).send(err);
    }
    res.status(200).json(anime);
    })
  });


  /* GET one Anime */
router.get('/FindAnime/:id', function(req, res) {
  console.log(req.params.id );
  Anime.find({ _id: req.params.id }, (err, oneAnime) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(oneAnime);
  });
});

module.exports = router;
