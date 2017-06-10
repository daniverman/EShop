/**
 * Created by daniel on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
var db = require('../DButils');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send("Entered to Items Main Page");
});

//return top 5 product that have the most sales (not top five from the week as required  )
//checked
router.get('/HotFive', function (req, res, next) {

    var query = "SELECT TOP 5 * FROM products ORDER BY salesNumber DESC";
    db.Select(query).then(function (ans) {

        //In case their if no five so give what it have- if noting so say that in the server to the client
        res.send(JSON.stringify(ans));
    })
});

//return new items from last month
//checked
router.get('/newItemsFromLastMonth', function (req, res) {
    var curDate = new Date();
    var month = curDate.getMonth() + 1;
    var year = curDate.getFullYear();
    var query = "SELECT * FROM products WHERE MONTH(AdeedOn) = " + month + " AND YEAR(AdeedOn) = " + year;
    db.Select(query).then(function (ans) {
        //In case their if no itens fromlast monts so give what it have- if noting so say that in the server to the client
        res.send(JSON.stringify(ans));
    })


});

//return all items by some categorey
//checked
router.get('/ItemByCategory', function (req, res) {
    var category = req.query.category;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products WHERE category = " + category + " ";
    console.log(query);
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});


//get item details by id
//checked
router.get('/ItemById', function (req, res) {
    var productId = req.query.productId;
    var query = "SELECT * FROM products WHERE productId ='" + productId + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});
//return item by name
//checked
router.get('/ItemByName', function (req, res) {
    var name = req.query.name;
    var query = "SELECT * FROM products WHERE name ='" + name + "'";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});
///////////////////////////////////-----------------daniel check in postman the next!!----------------
//return items sort by parmeter
//checked
router.get('/ItemsSortBy', function (req, res) {
    var sortBy = req.query.sortBy;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products ORDER BY '" + sortBy + "'" + " DESC";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});

//return items to user recommended for him
//not complete
router.get('/recommendedItems', function (req, res) {

    var query = "";
    db.Select(query).then(function (ans) {
        res.send(ans);
    })
});
//cart id is exist kavoaa for each one user 1:1 (cart id is equal to the userName of the user- only his content of the cart will change
//add item to cart + ned to add what happen if theirs not product in inventory
//check ->the problem is that i duplicate  key
router.post('/addItemToCart', function (req, res) {
    var productId = req.body.productId;
    var userName = req.body.userName;
    var TypeOfMatbea = req.body.TypeOfMatbea;
    var numberOfItems = req.body.AmountOftheSameItem;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        console.log(cartId);
        var query2 = "SELECT * FROM products WHERE productId = '" + productId + "'";
        db.Select(query2).then(function (ans) {
            var price = ans[0].price;
            var totalSum = price * AmountOftheSameItem;
            var query3 = "INSERT INTO cart_tb VALUES('" + cartId + "','" + AmountOftheSameItem + "','" + totalSum + "','" + TypeOfMatbea + "','" + productId + "')";
            console.log(query3);
            db.Insert(query3);
            var ans = {ans: true};

            res.send(JSON.stringify(ans));


        })
    })

});

//GelobalPrice will caculated only in this function!! and will not save in DB
router.get('/ViewCurrentItemsInWithGelobalPrice', function (req, res) {

    var productId = req.query.productId;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        var query1 = "SELECT * FROM cart_tb WHERE cartId = '" + cartId + "'";
        db.Select(query1).then(function (ans) {
            console.log(query1);

            var GelobalPrice_total_cost = 0;
            var totalSum = 0;

            function add_to_total_cost(item) {
                GelobalPrice_total_cost += item.totalSum;
            }

            ans.forEach(add_to_total_cost);

            console.log(total_cost);

            res.send({ans: GelobalPrice_total_cost});

        })
    })


});


router.get('/GetUpdatesDetailsOfItemInCart', function (req, res) {

    var userName = req.query.userName;
    var productId = req.query.productId;
    var AmountToRemove = req.body.AmountOfsameItemToRemove;

    //give me the cart of the user - and the item he choose past- check the amount currectly
    // - if is the same amount to remove- delete item all from cart
    // - if it is no all the amound only update the current amount after remove
    var query = "SELECT * FROM products WHERE productId = '" + productId + "'"; //can add check with the cart that the same item is on her
    db.Select(query1).then(function (ans) {
        console.log(query1);
        res.send(ans);
    })

});

router.post('/RemoveItemFromCart', function (req, res) {

    var productId = req.body.productId;
    var cartId = req.body.cartId;
    var AmountToRemoveOfTheSameItem = req.body.AmountToRemoveOfTheSameItem;
    var AmountOfItemsInDB = 0;
    var query = "SELECT * FROM cart_tb WHERE cartId = '" + cartId + "' AND productId ='" + productId + "'";
    db.Select(query).then(function (ans) {
        var AmountOfItemsInDB = ans[0].AmountOftheSameItem;
        var price = ans[0].price;
        var CurrentAmountToupdate = ans[0].AmountOftheSameItem - AmountToRemoveOfTheSameItem;
        if (CurrentAmountToupdate == 0) {
            var query2 = "DELETE FROM cart_tb WHERE  cartId = '" + cartId + "' AND productId ='" + productId + "'";
            db.Delete(query2).then(function (ans) {
                res.send(ans);
            })

        }
        else if (CurrentAmountToupdate != 0) {
            var totalSumToUpdate = price * CurrentAmountToupdate;

            var query3 = "UPDATE  cart_tb SET  AmountOftheSameItem = '" + CurrentAmountToupdate + "' AND totalSum ='" + totalSumToUpdate + "' WHERE cartId = '" + cartId + "' AND productId ='" + ItemId + "'";
            db.Update(query3).then(function (ans) {
                res.send(ans);
            })

        }

    })

});


//tableorder will contain UserName, Order ID , global price to pay ,typeOfMatbea, date of deliver, and boolean Paid OrNot!!! first date to chose to deliver
//Delete the current cart of the user

router.get('/GetPreviousOrders', function (req, res) {

    var UserName = req.query.UserName;
    var query = "SELECT * FROM order_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        //check if no orders prev
        if (ans == ok) {
            res.send(ans);
        }
        else    res.send(false);

    })

});

router.get('/GetPreviousOrderDetails', function (req, res) {

    var OrderId = req.query.OrderId;
    var query = "SELECT * FROM order_tb WHERE OrderId = '" + OrderId + "'";
    db.Select(query).then(function (ans) {
        //check if this order exist
        if (ans == ok) {
            res.send(ans);
        }
        else    res.send(false);

    })

});

router.get('/CheckItemInInvetory', function (req, res) {

    var productId = req.query.productId;
    var query = "SELECT * FROM products WHERE productId = '" + productId + "'";
    db.Select(query).then(function (ans) {
        //check if this order exist
        if (ans[0] != 0) {
            res.send(ans);
        }
        else    res.send(false);

    })

});

//tableorder will contain UserName, Order ID,statusOrder , global price to pay ,typeOfMatbea, date of deliver, and boolean Paid OrNot!!! first date to chose to deliver
//Delete the current cart of the user
//the client is wish to get the deliver from the "wishdate" (the law in client is to chosse date from more than week) - and server will take that date
router.post('/CreateNewOrder', function (req, res) {

    var userName = req.body.userName;
    var orderId = 0;
    var statusOrder = "Not Aprovved";
    var TypeOfMatbea = req.body.TypeOfMatbea;
    var GelobalPrice_total_cost = 0;
    var wishTodeliverDate = req.body.DateWish;
    var PaidOrder = false;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        var query1 = "SELECT * FROM cart_tb WHERE cartId = '" + cartId + "'";
        db.Select(query1).then(function (ans) {
            console.log(query1);
            var totalSum = 0;

            function add_to_total_cost(item) {
                GelobalPrice_total_cost += item.totalSum;
            }

            ans.forEach(add_to_total_cost);

            console.log(total_cost);
            var NumOfPrevOrders = 0;

            //get num of prev orders
            var query2 = "SELECT * FROM order_tb WHERE UserName = '" + UserName + "'";
            db.Select(query2).then(function (ans) {

                if (ans.length() != null) {
                    NumOfPrevOrders = ans.length();
                }
                orderId = NumOfPrevOrders + 1;
                var query3 = "INSERT INTO order_tb VALUES('" + userName + "','" + orderId + "','" + TypeOfMatbea + "','" + GelobalPrice_total_cost + "','" + PaidOrder + "','" + statusOrder + "','" + wishTodeliverDate + "')";
                db.Insert(query3).then(function (ans) {
                    res.send(ans);

                })
            })
        })
    })

});


router.post('/ApproveOrder', function (req, res) {

    var statusOrder = "Yes Approved";
    var orderId = req.body.OrderId;
    var userName = req.body.userName;
    var query = "UPDATE  order_tb SET  statusOrder = '" + statusOrder + "' WHERE OrderId = '" + OrderId + "' AND userName ='" + userName + "'";
    db.Update(query).then(function (ans) {
        //check that the order exist- else false return
        res.send(ans);
    })

});

router.post('/PayOrder', function (req, res) {


    var orderId = req.body.OrderId;
    var userName = req.body.userName;
    var PaidOrder = false;
    var query = "SELECT * FROM order_tb WHERE UserName = '" + UserName + "' AND OrderId =  '" + orderId + "'";
    db.Select(query).then(function (ans) {
        if (ans[0].statusOrder == "Yes Approved") {
            var PaidOrder = true;
            var cartId = ans[0].cartId;
            var SOId = ans[0].cartId;
            var AmountOftheSameItem = ans[0].AmountOftheSameItem;
            var totalSum = ans[0].totalSum;
            var TypeOfMatbea = ans[0].TypeOfMatbea;
            var productId = ans[0].productId;

            //add a part of copy of reshomot of the current cart of the user to the table "specification of items&amount In Order that pay"
            var query1 = "SELECT * FROM cart_tb WHERE cartId = '" + cartId + "'";
            db.Select(query1).then(function (ans) {

                function copy_each_row_to_specificationOrderTable(row) {
                    var query2 = "INSERT INTO sepecificationOrder_tb VALUES('" + SOId + "','" + AmountOftheSameItem + "','" + totalSum + "','" + TypeOfMatbea + "','" + productId + "')";
                    db.Insert(query2);
                }

                ans.forEach(copy_each_row_to_specificationOrderTable);


                var query3 = "UPDATE  order_tb SET  PaidOrder  = '" + PaidOrder + "' WHERE OrderId = '" + orderId + "' AND userName ='" + userName + "'";
                db.Update(query3).then(function (ans) {
                    //check that the order exist- else false return
                    //buy with remote system of creditcard of the user that in the system( from once he registered)
                    var query4 = "DELETE FROM cart_tb WHERE  cartId = '" + cartId + "'";
                    console.log(query4);
                    db.Delete(query4).then(function (ans) {
                        //the order was payed succesfully
                        res.send(ans);

                    })


                })
            })
        }
        else {
            res.send("false:You should to approve the order before you pay");
        }


    })

});


module.exports = router;