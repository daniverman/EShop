/**
 * Created by daniel on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
var db = require('../DButils');

var productJson = {
    "productId": "",
    "name": "",
    "price": "",
    "amountInInventory": "",
    "salesNumber": ""

}


/* GET home page. */
router.get('/', function (req, res, next) {
    //  res.send("in items main page");
    var jsAns = {
        "name": "daniel",
        "bla": "bla"
    }
    res.writeHead(200, {
        'Content-Type': 'text/json'
    });
    res.write(JSON.stringify(f));
    res.end();
    //res.json(f);
    //res.send(JSON.stringify(f));

});
//return top 5 product that have the most sales
router.get('/HotFive', function (req, res, next) {
    console.log("hj");
    var topFive = [];
    var ans=[];
    var qurey = "SELECT TOP(5) * FROM user_tb ORDER BY salesNumber";
    db.Select(qurey);
    topFive=res.body;
    for( var i =0 ; i<5 || topFive.length ; i++ ){
        ans[i].push(JSON.stringify(topFive[i]));
    }
    res.writeHead(200 , {
        'Content-Type' : 'text/json'
    });
    res.write(ans);
    res.end();



});


module.exports = router;