// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

var crypto = require("crypto");

function Sesh(db) {
    "use strict";

    var sessions = db.collection("sessions");

    this.startSesh = function(usr, cb) {
        "use strict";

        var cur_date = (new Date()).valueOf().toString();
        var rand     = Math.random().toString();
        var sesh_id  = crypto.createHash("sha1").update(cur_date + rand).digest("hex");

        sessions.insert({"_id": sesh_id, "usr": usr}, function(err, res) {
            "use strict";
            cb(err, sesh_id);
        });
    }

    this.endSesh = function(sesh_id, cb) {
        "use strict";
        sessions.remove({"_id": sesh_id}, function(err, res) {
            "use strict";
            cb(err, null);
        });
    }

    this.getUsr = function(sesh_id, cb) {
        "use strict";

        if(!sesh_id) {
            cb(new Error("Error: Session not set"), null);
            return;
        }

        sessions.findOne({"_id": sesh_id}, function(err, sesh) {
            "use strict";

            if(err) return cb(err, null);

            if(!sesh) {
                cb(new Error("Error: session# " + sesh_id + " not found"), null);
                return;
            }

            cb(null, sesh.usr);
        });
    }
}

module.exports.Sesh = Sesh;
