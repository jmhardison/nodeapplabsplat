////////////////////////////////////////
// nodeapplabsplat
// Copyright (c) 2018 Jonathan Hardison
////////////////////////////////////////


var config = require('../config');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var express = require('express');
var Router = express.Router;
var TYPES = require('tedious').TYPES;
//var q = require('q');
var uuidv4 = require('uuid/v4');

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
    api.get('/', (req, res) => {

        if((req.params.userid != null) || (req.params.userid != 'undefined')){
            //console.log("Input User: " + req.params.userid);

            var connection = new Connection(sqlconfig);
            var uuidstring = uuidv4();
            var epoctime = Date.now();
            

          
            connection.on('connect', function(err){
                var request = new Request("INSERT INTO dbo.SplatRecorder (SplatID, EPOCStamp) VALUES (@SplatID, @EPOCStamp); SELECT SERVERPROPERTY('MachineName') AS [ServerName], [SplatID], [EPOCStamp] FROM dbo.SplatRecorder WHERE SplatID=@SplatID;",
                function(err){
                    if(err){
                        console.log(err);
                    };
                });
            
                request.addParameter('SplatID', TYPES.UniqueIdentifierN, uuidstring);
                request.addParameter('EPOCStamp', TYPES.NVarChar, `The time since EPOC is ${epoctime}`);
            


                request.on('row', function(columns) {
                    res.json({Server: columns[0].value, SplatID: columns[1].value, EPOC: columns[2].value}).status(200);
                });


                connection.execSql(request);
            });
        
     

            

        }
    });
    
    return api;
}