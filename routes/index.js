var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Order = require("../Order");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
 "mongodb+srv://MongoUser:Murphy513@connercluster.rwxds.mongodb.net/StoreDB?retryWrites=true&w=majority";

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

var hourPurch = 0;
var dayPurch = 0;
router.post('/', function(req, res) {

    addPurchaseInfo(req, res);
    //console.log(req.body);

});

router.post('/NewOrder', function(req, res) {
    addPurchaseInfo(req, res);

    let oneNewOrder = new Order(req.body);  // call constuctor in Order code that makes a new mongo Order object
    console.log(req.body);
    oneNewOrder.save((err, order) => { //what is order and where is it coming from
        console.log(order);
        if (err) {
            res.status(500).send(err);
        }
        else {
            //console.log(order);
            res.status(201).json(order);
        }
    });
});


function addPurchaseInfo(req, res) {
    hourPurch += (Math.floor(Math.random() * 5) + 1);
    if (hourPurch > 23) {
        let tHourPurch = hourPurch - 24;
        hourPurch = tHourPurch;
        dayPurch++;
    }

    req.body.hourPurch = hourPurch;
    req.body.dayPurch = dayPurch;
    //console.log(req.body);
    return req.body;

}
module.exports = router;
