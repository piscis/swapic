import compress from 'compression'

class Middleware {

  constructor(app){

    this.app = app
    this._registerMiddleware();
  }

  _registerMiddleware(){

    this.app.use(compress());
  }
}


export default Middleware;