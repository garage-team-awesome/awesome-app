// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

var bodyParser    = require("body-parser")
  , cookieParser  = require("cookie-parser")
  , errorHandler  = require("./error").errorHandler
  , SeshHandler   = require("./sesh");

module.exports = exports = function(app, db) {
    var urlencodedParser = bodyParser.urlencoded({ extended: false });

    var jsonParser = bodyParser.json();

    var sesh = new Sesh(db);

    app.use(sesh.isLoggedInMiddleware);

    app.get("/login", sesh.displayLogin);
    app.post("/login", jsonParser, urlencodedParser, sesh.handleLogin);

    app.get("/logout", sesh.displayLogout);

    app.get("/welcome", sesh.displayWelcome);

    app.get("/signup", sesh.displaySignup);
    app.post("/signup", urlencodedParser, sesh.handleSignup);
}
