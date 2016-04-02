// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

// Err handling middleware
// TODO: This is great for debuging, but needs to be changed in the future
exports.errorHandler = function(err, req, res, next) {
    "use strict";
    console.error(err["message"]);
    console.error(err["stack"]);
    res.status(500);
    res.render("Oops", {err: err});
}
