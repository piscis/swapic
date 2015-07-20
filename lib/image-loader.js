import request from 'request';
import {PassThrough} from 'stream';

class ImageLoader {

  constructor(){}

  load(url){
    return request.get(url);
  }
}

export default ImageLoader;
