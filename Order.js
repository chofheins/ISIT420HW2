// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  StoreID: {
    type: String,
    required: true
  },
  SalesPersonID: {
    type: String,
    required: true
  },
  CdID: {
    type: String,
    required: true
  },
  PricePaid: {
    type: String,
    required: true
  },
  HourPurch: {
    type: String,
    required: true
  },
  DayPurch: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);