/**
 * Created by daniel on 02/06/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Connection = require('tedious').Connection;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connect to the database
//-------------------------------------------------------------------------------------------------------------------
var config = {
    userName: 'daniel',
    password: 'Eshop2017',
    server: 'dhshop.database.windows.net',
    requestTimeout: 15000,
    options: {encrypt: true, database: 'DH_ShopDB'}
};


var connection;

exports.Select = function (query) {
    return new Promise(function (resolve, reject) {
        connection = new Connection(config);
        var ans = [];
        var properties = [];
        connection.on('connect', function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                reject(err);
            }
            console.log('connection on');
            var dbReq = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
            });

            dbReq.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName != null)
                        properties.push(column.colName);
                });
            });
            dbReq.on('row', function (row) {
                var item = {};
                for (i = 0; i < row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });

            dbReq.on('requestCompleted', function () {
                console.log('request Completed: ' + dbReq.rowCount + ' row(s) returned');
                console.log(ans);
                connection.close();
                resolve(ans);

            });
            connection.err(dbReq);
        });
    });
};

exports.Insert = function(qurey){
    return new Promise(function (resolve, reject) {
        connection = new Connection(config);
        var ans = [];
        var properties = [];
        connection.on('connect', function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                reject(err);
            }
            console.log('connection on');
            var dbReq = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
            });

            dbReq.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName != null)
                        properties.push(column.colName);
                });
            });
            dbReq.on('row', function (row) {
                var item = {};
                for (i = 0; i < row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });

            dbReq.on('requestCompleted', function () {
                console.log('request Completed: ' + dbReq.rowCount + ' row(s) returned');
                console.log(ans);
                connection.close();
                resolve(ans);

            });
            connection.err(dbReq);
        });
    });

    exports.Insert = function (qurey) {
        connection = new connection(config);
        connection.on('connect' , function (err) {
            if(err){
                console.log(err);
            }
            else    {
                request = new Request(query,function (err, rowCount,rows) {

                });
                connection.execSql(request);
            }

        })

    }



};



