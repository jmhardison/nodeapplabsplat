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
var uuidv4 = require('uuid/v4');

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
            var uuidstring = uuidv4();
            var epoctime = Date.now();

            connection.on('connect', function(err) {


                request = new Request("INSERT INTO SplatRecorder (SplatID, EPOCStamp) VALUES (@SplatID, @EPOCStamp)", 
                function(err, rowCount) {
                    if (err) {
                        console.log(err);
                    } else { 
                    }
                    
                    var uuidstring = uuidv4();
                    var epoctime = Date.now();

                    request.addParameter('SplatID', TYPES.UniqueIdentifierN, uuidstring);
                    request.addParameter('EPOCStamp', TYPES.NVarChar, `The time since EPOC is ${epoctime}`);
                    


                    connection.close();
            });

            request.on('row', function(columns) {
                res.send(uuidstring);
            });

            // In SQL Server 2000 you may need: connection.execSqlBatch(request);
            connection.execSql(request);
            }
            );

        }
    });
    
    return api;
}