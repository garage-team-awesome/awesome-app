// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

var bcrypt = require("bcrypt-nodejs");

function User(db) {
    "use strict";

    var users = db.collection("users");

    this.addUsr = function(usr, pass, email, cb) {
        "use strict";

        var salt = bcrypt.genSaltSync();
        var pass_hash = bcrypt.hashSync(pass, salt);

        users.insert({"_id": usr, "pass": pass_hash, "email": email, "confirmed": false}, function(err, res) {
            "use strict";

            if(err) return cb(err, null);

            return cb(null, res[0]);
        });
    }

    this.validLogin = function(usr, pass, cb) {
        "use strict";

        users.findOne({"_id": usr}, function(err, res) {
            "use strict";

            if(err) return cb(err, null);

            if(res) {
                if(res["confirmed"] && bcrypt.compareSync(pass, res["pass"])) {
                    return cb(null, res);
                } else {
                    var bad_pass_err = new Error("Invalid Password");
                    bad_pass_err.bad_pass = true;
                    return cb(bad_pass_err, null);
                }
            } else {
                var bad_usr_err = new Error("Invalid Username");
                bad_usr_err.bad_usr = true;
                return cb(bad_usr_err, null);
            }
        });
    }
}


module.exports.User = User;
