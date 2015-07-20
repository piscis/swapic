import ImageResizer from './image-resizer.js';
import CacheLoader  from './cache-loader.js';
import sample from 'lodash/collection/sample';
import accum from 'accum';

class Router {

  constructor(app, config){
    this.app = app;
    this.config = config;
    this.constructRoutes();
  }

  constructRoutes(){

    this.app.all('/',(req,res)=>{
      res.send('SwaPic server go to /random-image/ to see random image');
    });

    this.app.get('/random-image',(req, res)=>{
      let url = sample(this.config.pics);
      let cacheLoader = new CacheLoader(this.config);
      cacheLoader.load(url).pipe(res);
    });

    let resizeableRoute = (req, res)=> {

      let url = sample(this.config.pics);
      let cacheLoader = new CacheLoader(this.config);
      let {x,y} = req.params;

      cacheLoader.load(url).pipe(accum.buffer((buffer)=> {
        let iR = new ImageResizer(buffer).resize(x,y).pipe(res);
      }));
    };

    this.app.get('/random-image/resize/:x-:y', resizeableRoute);

    this.app.get('/random-image/resize/:x', resizeableRoute);

  }

}

export default Router;