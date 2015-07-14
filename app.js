require("babel/register");
var Server = require("./lib/server");

// Bootstrapping
var srv = new Server('./config.yaml');

srv.listen();