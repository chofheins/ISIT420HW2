// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  watched: {
    type: Boolean,
    required: true
  },
  ranking: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Anime", AnimeSchema);