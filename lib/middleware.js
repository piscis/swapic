import compress from 'compression'
import express  from 'express'

class Middleware {

  constructor(app){

    this.app = app
    this._registerMiddleware();
  }

  _registerMiddleware(){

    this.app.use(compress());
    this.app.use(express.static('./public'));
  }
}

export default Middleware;