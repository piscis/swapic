import ImageLoader from './image-loader.js';
import sample from 'lodash/collection/sample';

class Router {

  constructor(app, config){

    this.app = app;
    this.config = config;
    this.constructRoutes();
  }

  constructRoutes(){

    this.app.all('/',(req,res)=>{
      res.send('SwaPic server go to /random-image to see random image');
    });

    this.app.get('/random-image',(req, res)=>{
      let url = sample(this.config.pics);
      let imgLoader = new ImageLoader(res);
      imgLoader.load(url);
    });
  }

}

export default Router;