////////////////////////////////////////
// nodeapplabsplat
// Copyright (c) 2018 Jonathan Hardison
////////////////////////////////////////


var config = require('../config');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var express = require('express');
var Router = express.Router;

let configInstance = new config();

var sqlconfig = {
  server: configInstance.sqlserver,
  userName: configInstance.sqluser,
  password: configInstance.sqlpass,
  options: {
    database: configInstance.sqldb,
    port: configInstance.sqlport
  }
};
module.exports = ({inconfig}) => {
    let api = Router();
    
    // general
    api.delete('/', (req, res) => {

            var connection = new Connection(sqlconfig);
            
            connection.on('connect', function(err){
                var request = new Request("TRUNCATE TABLE dbo.SplatRecorder; SELECT COUNT([SPLATID]) FROM dbo.SplatRecorder;",
                function(err){
                    if(err){
                        console.log(err);
                    };
                });
        
                request.on('row', function(columns) {
                    res.json({AfterDeleteCount: columns[0].value}).status(200);
                });

                connection.execSql(request);
            });
        
     

            

        
    });
    
    return api;
};