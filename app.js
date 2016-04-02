// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

var express      = require("express")
  , read         = require("read")
  , MongoClient  = require("mongodb").MongoClient
  , cons         = require("consolidate")
  , routes       = require("./routes")
  , cookieParser = require("cookie-parser")
  , path         = require("path")
  , app          = express();

user_input = {
    "usr": "",
    "host": "localhost",
    "port": "27017",
    "db": "refugee"
};

var i = 2;
var argv = process.argv;
var new_len = argv.length - 1;
while(i < new_len) {
    var arg = argv[i].replace("--", "");
    if(arg in user_input) {
        user_input[arg] = argv[i + 1];
    } else {
        throw Error("Could not parse user input: " + argv[i]);
    }
    i += 2;
}

var url = "mongodb://" + user_input["host"] + ":" + user_input["port"] + "/" + user_input["db"];

read({"prompt": "Password: ", "silent": true}, function(err, pwd) {
    MongoClient.connect(url, function(err, db) {
        db.authenticate(user_input["usr"], pwd, function(err, result) {
            "use strict";

            if(!result) throw Error("Failed to log in with user - " + user_input["usr"])

            if(err) throw err;

            app.engine("html", cons.swig);
    
            app.set("view engine", "html");
    
            app.use(express.static(path.join(__dirname, 'public')));
    
            app.set("views", __dirname + "/views");
    
            app.use(cookieParser());
    
            routes(app, db);
    
            app.listen(3000);
    
            console.log("Express server listening on port 3000");
        });
    });
});
