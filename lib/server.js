import Express from 'express';
import Router from './router.js';
import ConfigLoader from './config-loader.js';
import Middleware from './middleware.js';

class Server {

  constructor(configFile) {
    this.app = Express();
    this.config = new ConfigLoader(configFile).load();
  }

  _registerHelper(){
    this.middleware = new Middleware(this.app);
  }

  _registerRoutes(){

    this.routes = new Router(this.app, this.config);
  }

  listen(cb = ()=>{}) {

    this._registerHelper();
    this._registerRoutes();

    let port = (process.env.PORT || this.config.server.port);
    let host = this.config.server.host;

    var server = this.app.listen(port,host, ()=>{

      let host = server.address().address;
      let port = server.address().port;

      console.log('App listening at http://%s:%s', host, port)
      cb()

    })
  }
}

export default Server;