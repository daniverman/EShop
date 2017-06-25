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

    var today = new Date();
    var weekAgo = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1; //January is 0!
    var year = today.getFullYear();
    //  console.log("day" + day + "month" + month + "year" + year);
    //  console.log(today);

    if (day < 7) {
        weekAgo = new Date(year, month - 1, 30 - day);
    }
    else {
        weekAgo = new Date(year, month, day - 7);
    }
    //  console.log(weekAgo);

    var query = "SELECT TOP 5 * FROM products  WHERE MONTH(AdeedOn) >= " + weekAgo.getMonth() + " AND DAY(AdeedOn) >= " + weekAgo.getDate() + " ORDER BY salesNumber DESC";
    //  console.log(query);
    db.Select(query).then(function (ans) {
        console.log(query);
        if (ans.length == 0) {
            var ans = {
                ans: "false"
            }
            res.send(ans);
        }
        else {
            res.send(JSON.stringify(ans));
        }

    })
        .catch(function (ans) {
            res.status(403).send(false);
        })


});

//return new items from last month
//checked
router.get('/newItemsFromLastMonth', function (req, res) {

    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {

        var curDate = new Date();
        var year = curDate.getFullYear();
        if (curDate.getMonth() == 00) {
            year -= 1;
            var month = 12;
        }
        else {
            var month = curDate.getMonth();
        }
        //  console.log(month)
        var query = "SELECT * FROM products WHERE MONTH(AdeedOn) >= " + month + " AND YEAR(AdeedOn) >= " + year;
        //   console.log(query);
        db.Select(query).then(function (ans) {
            if (ans.length == 0) {
                res.send(false);
            }
            else {
                res.send(JSON.stringify(ans));
            }
        })
            .catch(function (ans) {
                res.send(false);
            })

    }
});

//checked
router.get('/recommendedItemsForUser/GetUserCategories', function (req, res) {

    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var userName = req.query.userName;

        var query1 = "SELECT * FROM user_categories WHERE userName = '" + userName + "'";

        db.Select(query1).then(function (ans) {

            if (ans.length == 0) {
                res.send(false);
            }
            else {
                res.send(ans);
            }
        })
            .catch(function (ans) {
                res.send(false);
            })

    }
});
//checked
router.get('/recommendedItemsForUser/AddMoreRecommendedItemsByCategory', function (req, res) {

    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var userName = req.query.userName;
        var categoryId = req.query.categoryId;
        //   console.log(userName);
        var query = "SELECT TOP 5 * FROM products WHERE categoryId = " + categoryId + "  ORDER BY salesNumber DESC";
        //  console.log(query);
        db.Select(query).then(function (ans) {

            if (ans.length == 0) {
                res.send(false);
            }
            else {
                res.send(ans);
            }
        })
            .catch(function (ans) {
                res.send(false);
            })
    }
});


//check if the category and user already exist
//checked
router.get('/SetFavoriteCategory/CheckExistCategoryId', function (req, res) {

    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var cat = req.query.categoryId;
        var user = req.query.userName;
        var query1 = "SELECT * FROM user_categories WHERE categoryId = " + cat + " AND userName = '" + user + "'";
        // console.log(query1);
        db.Select(query1).then(function (ans) {

            if (ans.length > 0)
                res.send(true);
            else {
                res.send(false);
            }
        })
            .catch(function (ans) {
                res.send(false);
            })
    }
});
//checked
router.post('/SetFavoriteCategory/AddNewCategory', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {

        var cat = req.body.categoryId;
        var user = req.body.userName;

        var query = "INSERT INTO user_categories VALUES ('" + cat + "','" + user + "')";
        console.log(query);
        db.Insert(query);
        res.send(true);
    }

});


//return all items by some categorey
//checked
router.get('/ItemByCategory', function (req, res) {
    var category = req.query.categoryId;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products WHERE categoryId = " + category + " ";
    //console.log(query);
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }
    })
        .catch(function (ans) {
            res.send(false);
        })
});


//get item details by id
//checked
router.get('/ItemById', function (req, res) {
    var productId = req.query.productId;
    var query = "SELECT * FROM products WHERE productId ='" + productId + "'";
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }
    })
        .catch(function (ans) {
            res.send(false);
        })
});
//return item by name
//checked
router.get('/ItemByName', function (req, res) {
    var name = req.query.name;
    var query = "SELECT * FROM products WHERE name ='" + name + "'";
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }
    })
        .catch(function (ans) {
            res.send(false);
        })
});
//return items sort by parmeter:Size or added date
//checked
router.get('/ItemsSortBy', function (req, res) {
    var parm = req.query.parm;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products ORDER BY '" + parm + "'" + " DESC";
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }
    })
        .catch(function (ans) {
            res.send(false);
        })
});


//When add to cart - the global amount of the item in inventory dont changed- only in buy - it will change
//counsme that amountInInventory is update every week and it has a high amount of per item
//checked
router.post('/addItemToCart', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {

        var productId = req.body.productId;
        var cartId = req.body.cartId;
        var AmountOfTheSameItem = req.body.AmountOfTheSameItem;
        if (productId != null) {
            var query2 = "SELECT * FROM products WHERE productId = '" + productId + "'";
            db.Select(query2).then(function (ans) {
                var price = ans[0].price;
                var totalSum = price * AmountOfTheSameItem;
                var query3 = "INSERT INTO cart VALUES( '" + cartId + "','" + productId + "','" + AmountOfTheSameItem + "','" + totalSum + "' )";

                db.Insert(query3);
                res.send(true);
            })
                .catch(function (ans) {
                    res.send(false);
                })
        }
        else {
            res.send(false);
        }

    }
});


//GelobalPrice will caculated only in this function!! and will not save in DB
//checked
router.get('/ViewCurrentItemsInCartWithGelobalPrice', function (req, res) {
//return in the last cell of ans the global price
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {

        var cartId = req.query.cartId;

        var query1 = "SELECT * FROM cart WHERE cartId = '" + cartId + "'";
        db.Select(query1).then(function (ans) {
            //console.log(query1);

            var GelobalPrice_total_cost = 0;
            var totalSum = 0;

            function add_to_total_cost(item) {
                GelobalPrice_total_cost += item.totalSum;
            }

            ans.forEach(add_to_total_cost);

            ans.push(JSON.stringify(GelobalPrice_total_cost));
            res.send(ans);


        })

            .catch(function (ans) {
                res.send(false);
            })
    }
});
//checked
router.get('/GetUpdatesDetailsOfItemInCart', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var productId = req.query.productId;

        var query = "SELECT * FROM products WHERE productId = '" + productId + "'";
        db.Select(query).then(function (ans) {
            //   console.log(query);
            if (ans.length == 0) {
                res.send(false);
            }
            else {
                res.send(ans);
            }
        })
    }
});
// checked
router.post('/RemoveItemFromCart', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var productId = req.body.productId;
        var cartId = req.body.cartId;
        var AmountToRemoveOfTheSameItem = req.body.AmountToRemoveOfTheSameItem;
        var query = "SELECT * FROM cart WHERE cartId = '" + cartId + "' AND productId ='" + productId + "'";
        console.log(query);
        db.Select(query).then(function (ans) {

            var AmountOfItemInDB = ans[0].AmountOfTheSameItem;
            console.log(" AmountOfItemInDB : " + AmountOfItemInDB);
            var totalSum = ans[0].totalSum;
            var price = totalSum / AmountOfItemInDB;
            console.log(" price : " + price);
            var CurrentAmountToupdate = AmountOfItemInDB - AmountToRemoveOfTheSameItem;
            console.log(CurrentAmountToupdate);
            if (CurrentAmountToupdate == 0) {
                console.log("delete all item");
                var query2 = "DELETE FROM cart WHERE  cartId = '" + cartId + "' AND productId ='" + productId + "'";
                db.Delete(query2).then(function (ans) {
                    res.send(ans);
                })
            }
            else if (CurrentAmountToupdate != 0) {
                var totalSumToUpdate = (price * CurrentAmountToupdate);
                console.log("update");
                query2 = "UPDATE cart SET AmountOfTheSameItem = '" + CurrentAmountToupdate + "', totalSum = '" + totalSumToUpdate + "'" + " WHERE cartId = '" + cartId + "' AND productId = '" + productId + "'";
                // console.log(query2);
                db.Insert(query2);
                res.send(true);

            }

        })
            .catch(function (ans) {
                res.send(false);
            })

    }
});

//checked
router.get('/GetPreviousOrders', function (req, res) {
//return in the last cell of ans the amount of the prev orders

    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var userName = req.query.userName;
        var query = "SELECT * FROM order_tb WHERE userName = '" + userName + "'";
        db.Select(query).then(function (ans) {

            if (ans.length > 0) {
                ans.push(ans.length);
                res.send(ans);

            }
            else {
                res.send(false);
            }

        })
            .catch(function (ans) {
                res.send(false);
            })
    }
});

//checked
router.get('/GetPreviousOrderDetails', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var orderId = req.query.orderId;
        var userName = req.query.userName;
        var query = "SELECT * FROM order_tb WHERE orderId = '" + orderId + "' AND userName='" + userName + "'";
        db.Select(query).then(function (ans) {

            if (ans.length > 0) {
                res.send(ans);
            }
            else {
                res.send(false);
            }

        })
            .catch(function (ans) {
                res.send(false);
            })
    }
});
//checked
router.get('/GetAmountOfItemInInvetory', function (req, res) {
//return in the last cell of ans the amount of the item

    var productId = req.query.productId;
    var query = "SELECT * FROM products WHERE productId = '" + productId + "'";
    db.Select(query).then(function (ans) {

        if (ans.length > 0) {
            var ans1 = ans[0].amountInInventory;
            ans.push(ans1);
            res.send(ans);
        }
        else {
            res.send(false);
        }

    }).catch(function (ans) {
        res.send(false);
    })

});

//the law in client side: is to chose date from more than week in the side clinet from the current day today - and server will take that date
//checked
router.post('/CreateNewOrder', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var userName = req.body.userName;
        var orderId = req.body.NumofPrevOrders + 1;
        var statusOrder = "Not Approved";
        var TypeOfMatbea = req.body.TypeOfMatbea;
        var GelobalPrice_total_cost = req.body.GelobalPrice_total_cost;
        var dateOfDeliver = req.body.dateOfDeliver;
        var PaidOrder = false;

        var query3 = "INSERT INTO order_tb VALUES('" + userName + "','" + orderId + "','" + TypeOfMatbea + "','" + GelobalPrice_total_cost + "','" + PaidOrder + "','" + statusOrder + "','" + dateOfDeliver + "')";
        console.log(query3);
        db.Insert(query3);
        res.send(true);
    }
});
//checked
//we counsume that the order must create before that func! (in the server side)
router.post('/ApproveOrder', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var statusOrder = "Yes Approved";
        var orderId = req.body.orderId;
        var userName = req.body.userName;
        var query = "UPDATE order_tb SET statusOrder = '" + statusOrder + "'  WHERE orderId = '" + orderId + "' AND userName = '" + userName + "'";
        db.Insert(query);
        res.send(true);
    }
});


//update the amount of the item in the inventory !!!!!!!
//checked
router.get('/PayOrder/CheckEnoughAmountInInventory', function (req, res) {
//return in the last cell of the ans the amount which left in inventory after the buy
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var cartId = req.query.cartId;
        var productId = req.query.productId;
        var currentAmountItemInCart = 0;
        var query = "SELECT * FROM cart WHERE cartId  = '" + cartId + "' AND productId =  '" + productId + "'";
        db.Select(query).then(function (ans) {
            if (ans.length != 0) {
                currentAmountItemInCart = ans[0].AmountOfTheSameItem;
                console.log(currentAmountItemInCart);
            } else {
                res.send(false);
            }

        }).then(function (ans) {

            var query1 = "SELECT * FROM products WHERE productId  = '" + productId + "'";
            db.Select(query1).then(function (ans) {
                var amountInInventory = ans[0].amountInInventory;
                console.log(query1);
                if (currentAmountItemInCart <= amountInInventory) {
                    //    console.log(amountInInventory-currentAmountItemInCart);
                    var leftInInv = amountInInventory - currentAmountItemInCart;
                    ans.push(leftInInv)
                    res.send(ans);
                }
                else {
                    res.send(false);
                }

            })
                .catch(function (ans) {
                    res.send(false);
                })
        }).catch(function (ans) {
            res.send(false);
        })
    }
});


//update the amount of the item in the inventory !!!!!!!
//checked
router.post('/PayOrder/UpdatetheCurrectAmountInInventory', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var productId = req.body.productId;
        var leftInInv = req.body.leftInInv;
        if (productId != null & leftInInv != null) {
            var query = "UPDATE products SET amountInInventory = '" + leftInInv + "'  WHERE productId = '" + productId + "'";
            db.Insert(query);
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
});


//view cart will before this func && price relevant of product
//update the amount of the item in the inventory !!!!!!!
router.post('/PayOrder/AddNewSpecificationOrderAndPay', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var orderId = req.body.orderId;
        var userName = req.body.userName;
        var productId = req.body.productId;
        var amount = req.body.amount;
        var totalSum = req.body.totalSum;
        var price = req.body.price;
        var TypeOfMatbea = req.body.TypeOfMatbea;

        var cartId = userName;
        var query2 = "INSERT INTO spcificationOrder_tb VALUES('" + orderId + "','" + userName + "','" + productId + "','" + amount + "','" + totalSum + "','" + TypeOfMatbea + "','" + price + "')";
        db.Insert(query2);
        console.log(query2);
    }
});


router.post('/PayOrder/PayCart', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var orderId = req.body.orderId;
        var userName = req.body.userName;
        var tr = 1;
        var query = "UPDATE order_tb SET PaidOrNot = '" + tr + "'  WHERE orderId = '" + orderId + "' AND userName = '" + userName + "'";
        db.Insert(query);
        res.send(true);
    }
});

router.post('/PayOrder/DeleteCart', function (req, res) {
    if (!checkLogin(req)){
        res.status(403).send("you are not logged in");
    }
    else {
        var userName = req.body.userName;

        var query = "DELETE FROM cart WHERE cartId = '" + userName + "'";
        db.Delete(query);
        console.log("The Order Payed Succesfully");
        res.send(true);
    }
});

module.exports = router;

