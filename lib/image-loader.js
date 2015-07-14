import request from 'request';

class ImageLoader {

  constructor(response){
    this.response = response;
  }

  load(url){
    return request.get(url).pipe(this.response);
  }
}

export default ImageLoader;
