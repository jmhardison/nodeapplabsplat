////////////////////////////////////////
// nodeapplabsplat
// Copyright (c) 2018 Jonathan Hardison
////////////////////////////////////////


var config = require('../config');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var express = require('express');
var Router = express.Router;
//var q = require('q');

let configInstance = new config();

var sqlconfig = {
  server: configInstance.sqlserver,
  userName: configInstance.sqluser,
  password: configInstance.sqlpass,
  database: configInstance.sqldb,
  options: {
    port: configInstance.sqlport
  }
};
module.exports = ({inconfig}) => {
    let api = Router();
    
    // general
    api.get('/', (req, res) => {

        if((req.params.userid != null) || (req.params.userid != 'undefined')){
            //console.log("Input User: " + req.params.userid);

            var connection = new Connection(sqlconfig);

            connection.on('connect', function(err) {
                var querystring = `EXEC ${configInstance.sqldb}.dbo.${configInstance.sqlproc} ${req.params.userid}`;
                request = new Request(querystring, function(err, rowCount) {
                    if (err) {
                    console.log(err);
                    } else { 
                    }
                    connection.close();
            });

            request.on('row', function(columns) {
                res.send(columns[1].value);
            });

            // In SQL Server 2000 you may need: connection.execSqlBatch(request);
            connection.execSql(request);
            }
            );

        }
    });
    
    return api;
}