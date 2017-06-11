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


    console.log("day" + day + "month" + month + "year" + year);

    console.log(today);


    if (day < 7) {
        weekAgo = new Date(year, month - 1, 30 - day);

    }
    else {
        weekAgo = new Date(year, month, day - 7);
    }
    console.log(weekAgo);

    var query = "SELECT TOP 5 * FROM products  WHERE MONTH(AdeedOn) >= " + weekAgo.getMonth() + " AND DAY(AdeedOn) >= " + weekAgo.getDate() + " ORDER BY salesNumber DESC";
    console.log(query);
    db.Select(query).then(function (ans) {

        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(JSON.stringify(ans));
        }

    })
});

//return new items from last month
//checked
router.get('/newItemsFromLastMonth', function (req, res) {
    var curDate = new Date();
    var year = curDate.getFullYear();
    if (curDate.getMonth() == 00) {
        year -= 1;
        var month = 12;
    }
    else {
        var month = curDate.getMonth();
    }
    console.log(month)
    var query = "SELECT * FROM products WHERE MONTH(AdeedOn) >= " + month + " AND YEAR(AdeedOn) >= " + year;
    console.log(query);
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(JSON.stringify(ans));
        }
    })


});

//return recommended items for user->go over all the user favorite category and return top 5  items in category
//checked
router.get('/recommendedItemsForUser/GetUserCategories', function (req, res) {

   // var recAns = [];
    var userName = req.query.userName;
    console.log(userName);
    var query1 = "SELECT * FROM user_categories WHERE userName = '" + userName + "'";
    console.log(query1);
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


});
//checked
router.get('/recommendedItemsForUser/AddMoreRecommendedItemsByCategory', function (req, res) {


    var userName = req.query.userName;
    var categoryId = req.query.categoryId;
    console.log(userName);
    var query= "SELECT TOP 5 * FROM products WHERE categoryId = " + categoryId + "  ORDER BY salesNumber DESC";
    console.log(query);
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



//set user favorite category
//need to check
router.get('/SetFavoriteCategory/CheckExistcategoryId', function (req, res) {
    var cat = req.query.categoryId;
    var user = req.query.userName;
    var query1 = "SELECT * FROM user_categories WHERE categoryId = " + cat + " AND userName = '" + user+"'";
    console.log(query1);
    db.Select(query1).then(function (ans) {
        console.log("anf");
        if (ans.length > 0)
            res.send("True");
        else {
             res.send("False  ");
            }
        })

});

router.post('/SetFavoriteCategory/AddNewCategory', function (req, res) {
    var cat = req.body.categoryId;
    var user = req.body.userName;
    if(cat!=null & user!=null){
        var query = "INSERT INTO user_categories VALUES ('" + user + "', '" + cat + "')";
        console.log(query);
        db.Insert(query);
    }
    else{
        res.send(false);
    }


});


//return all items by some categorey
//checked
router.get('/ItemByCategory', function (req, res) {
    var category = req.query.category;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products WHERE category = " + category + " ";
    console.log(query);
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }


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
});
//return items sort by parmeter:Size or Color Only
//check again!!
router.get('/ItemsSortBySizeOrColor', function (req, res) {
    var sortBySizeOrColor = req.query.sortBySizeOrColor;
    var maxProductsToReturn = req.query.maxProductsToReturn;
    var query = "SELECT TOP " + maxProductsToReturn + " * FROM  products ORDER BY '" + sortBySizeOrColor + "'" + " DESC";
    db.Select(query).then(function (ans) {
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }
    })
});


//When add to cart - the global amount of the iten in inventory dont changed- only in buy - it will change
//counsue that amountInInventory is update every week and it has a high amount of per item
//need to check + need to add what happen if theirs not product in inventory
router.post('/addItemToCart', function (req, res) {
    var productId = req.body.productId;
    var userName = req.body.userName;
    var typeOfMatbea = req.body.typeOfMatbea;
    var AmountOfTheSameItem = req.body.AmountOfTheSameItem;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        console.log(cartId);
        var query2 = "SELECT * FROM products WHERE productId = '" + productId + "'";
        db.Select(query2).then(function (ans) {
            var price = ans[0].price;
            var amountInInventory = ans[0].amountInInventory;
            if (AmountOfTheSameItem <= amountInInventory) {
                var totalSum = price * AmountOftheSameItem;
                var query3 = "INSERT INTO cart VALUES('" + cartId + "','" + AmountOfTheSameItem + "','" + totalSum + "','" + typeOfMatbea + "','" + productId + "')";
                console.log(query3);
                db.Insert(query3);

                if (ans.length == 0) {
                    res.send(false);
                }
                else {
                    var ans = {ans: true};
                    res.send(JSON.stringify(ans));
                }

            }
            else {
                res.send("No Amount In Inventory of this Item Or The Product Is not Exist In Inventory ");
                // res.send(false);
            }


        })
    })
        .catch(function (ans) {
            res.send(false);
        })
});

//GelobalPrice will caculated only in this function!! and will not save in DB
router.get('/ViewCurrentItemsInWithGelobalPrice', function (req, res) {

    var productId = req.query.productId;
    var userName = req.query.userName;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        var query1 = "SELECT * FROM cart WHERE cartId = '" + cartId + "'";
        db.Select(query1).then(function (ans) {
            console.log(query1);

            var GelobalPrice_total_cost = 0;
            var totalSum = 0;

            function add_to_total_cost(item) {
                GelobalPrice_total_cost += item.totalSum;
            }

            ans.forEach(add_to_total_cost);

            console.log(total_cost);
            if (ans.length == 0) {
                res.send(false);
            }
            else {
                res.send({ans: GelobalPrice_total_cost});
            }


        })
    })
        .catch(function (ans) {
            res.send(false);
        })

});

router.get('/GetUpdatesDetailsOfItemInCart', function (req, res) {

    var userName = req.query.userName;
    var productId = req.query.productId;

    var query = "SELECT * FROM products WHERE productId = '" + productId + "'"; //can add check with the cart that the same item is on her
    db.Select(query).then(function (ans) {
        console.log(query);
        if (ans.length == 0) {
            res.send(false);
        }
        else {
            res.send(ans);
        }
    })

});

//check that
router.post('/RemoveItemFromCart', function (req, res) {
    //give me the cart of the user - and the item he choose past- check the amount currectly
    // - if is the same amount to remove- delete item all from cart
    // - if it is no all the amound only update the current amount after remove
    var productId = req.body.productId;
    var cartId = req.body.cartId;
    var AmountToRemoveOfTheSameItem = req.body.AmountToRemoveOfTheSameItem;
    var AmountOfItemsInDB = 0;
    var query = "SELECT * FROM cart WHERE cartId = '" + cartId + "' AND productId ='" + productId + "'";
    db.Select(query).then(function (ans) {
        var AmountOfItemsInDB = ans[0].AmountOftheSameItem;
        var price = ans[0].price;
        var CurrentAmountToupdate = ans[0].AmountOftheSameItem - AmountToRemoveOfTheSameItem;
        if (CurrentAmountToupdate == 0) {
            var query2 = "DELETE FROM cart WHERE  cartId = '" + cartId + "' AND productId ='" + productId + "'";
            db.Delete(query2).then(function (ans) {
                res.send(ans);
            })

        }
        else if (CurrentAmountToupdate != 0) {
            var totalSumToUpdate = price * CurrentAmountToupdate;

            var query3 = "UPDATE  cart SET  AmountOftheSameItem = '" + CurrentAmountToupdate + "' AND totalSum ='" + totalSumToUpdate + "' WHERE cartId = '" + cartId + "' AND productId ='" + ItemId + "'";
            db.Update(query3).then(function (ans) {
                res.send(ans);
            })

        }

    })
        .catch(function (ans) {
            res.send(false);
        })
});


router.get('/GetPreviousOrders', function (req, res) {

    var userName = req.query.userName;
    var query = "SELECT * FROM order_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {

        if (ans.length > 0) {
            res.send(ans);
        }
        else    res.send(false);

    })

});


router.get('/GetPreviousOrderDetails', function (req, res) {

    var orderId = req.query.orderId;
    var query = "SELECT * FROM order_tb WHERE orderId = '" + orderId + "'";
    db.Select(query).then(function (ans) {
        //check if this order exist
        if (ans.length > 0) {
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
        if (ans.length > 0) {
            res.send(ans);
        }
        else    res.send(false);

    })

});

//the law in client side: is to chose date from more than week in the side clinet from the current day today - and server will take that date
router.post('/CreateNewOrder', function (req, res) {

    var userName = req.body.userName;
    var orderId = 0;
    var statusOrder = "Not Approved";
    var TypeOfMatbea = req.body.TypeOfMatbea;
    var GelobalPrice_total_cost = 0;
    var firstDateToChoseToDeliver = req.body.firstDateToChoseToDeliver;
    var PaidOrder = false;
    var query = "SELECT * FROM user_tb WHERE userName = '" + userName + "'";
    db.Select(query).then(function (ans) {
        var cartId = ans[0].cartId;
        var query1 = "SELECT * FROM cart WHERE cartId = '" + cartId + "'";
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
            var query2 = "SELECT * FROM order_tb WHERE userName = '" + UserName + "'";
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
        .catch(function (ans) {
            res.send(false);
        })

});

router.post('/ApproveOrder', function (req, res) {

    var statusOrder = "Yes Approved";
    var orderId = req.body.orderId;
    var userName = req.body.userName;
    var query = "UPDATE  order_tb SET  statusOrder = '" + statusOrder + "' WHERE orderId = '" + orderId + "' AND userName ='" + userName + "'";
    db.Update(query).then(function (ans) {
        if (ans.length > 0) {
            res.send(ans);
        }
        else {
            res.send(false);
        }

    })

});

//update the amount of the item in the inventory !!!!!!!
router.post('/PayOrder', function (req, res) {

    var orderId = req.body.orderId;
    var userName = req.body.userName;
    var PaidOrder = false;
    var query = "SELECT * FROM order_tb WHERE userName = '" + userName + "' AND orderId =  '" + orderId + "'";
    db.Select(query).then(function (ans) {
        if (ans[0].statusOrder == "Yes Approved") {
            var PaidOrNot = true;
            var cartId = ans[0].cartId;

            var AmountOftheSameItem = ans[0].AmountOftheSameItem;
            var totalSum = ans[0].totalSum;
            var TypeOfMatbea = ans[0].TypeOfMatbea;
            var productId = ans[0].productId;

            //add a part of copy of reshomot of the current cart of the user to the table "specification of items&amount In Order that pay"
            var query1 = "SELECT * FROM cart WHERE cartId = '" + cartId + "'";
            db.Select(query1).then(function (ans) {

                function copy_each_row_to_specificationOrderTable(row) {
                    var query2 = "INSERT INTO spcificationOrder_tb VALUES('" + orderId + "','" + userName + "','" + productId + "','" + totalSum + "','" + TypeOfMatbea + "','" + AmountOftheSameItem + "')";
                    db.Insert(query2);
                }

                ans.forEach(copy_each_row_to_specificationOrderTable);
                var query3 = "UPDATE  order_tb SET  PaidOrNot  = '" + PaidOrNot + "' WHERE orderId = '" + orderId + "' AND userName ='" + userName + "'";
                db.Update(query3).then(function (ans) {
                    //check that the order exist- else false return
                    //buy with remote system of creditcard of the user that in the system( from once he registered)
                    var query4 = "DELETE FROM cart WHERE  cartId = '" + cartId + "'";
                    console.log(query4);
                    db.Delete(query4).then(updateInventoryAfterBuy(orderId, userName)).then(function (ans) {
                        res.send("The Order Was Payed Succesfully");
                    })

                })
            })
                .catch(function (ans) {
                    res.send(false);
                })
        }
        else {
            res.send("false:You should to approve the order before you pay");
        }


    })

});

function updateInventoryAfterBuy(orderId, userName) {

    //add a part of copy of reshomot of the current cart of the user to the table "specification of items&amount In Order that pay"
    var query1 = "SELECT * FROM spcificationOrder_tb WHERE orderId = '" + orderId + "' AND userName= '" + userName + "'";
    db.Select(query1).then(function (ans) {

        function copy_each_row_to_specificationOrderTable(product) {
            var productId = product.productId;
            var query2 = "SELECT * FROM products WHERE productId = '" + productId + "'";
            db.Select(query2).then(function (ans) {
                //we do not care if will be hosarim- the inventory will care about to fill them
                var amountInInventoryUpdate = ans.amountInInventory - product.AmountOftheSameItem;
                var query3 = "UPDATE  products SET  amountInInventory  = '" + amountInInventoryUpdate + "' WHERE productId = '" + productId + "'";
                db.Update(query3);
            })

            ans.forEach(copy_each_row_to_specificationOrderTable);
        }
    })
        .catch(function (ans) {
            res.send(false);
        })
}


module.exports = router;