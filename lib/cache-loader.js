import ImageLoader from './image-loader.js';
import fs from 'fs';
import md5 from 'md5';
import path from 'path';
import mkdirp from 'mkdirp';
import {PassThrough} from 'stream';

class CacheLoader {

    constructor(config) {
        this.cacheDir = path.resolve(config.server.cacheDir);
        mkdirp.sync(this.cacheDir);
    }

    hashForUrl(url) {
        return md5(`cached-file-${url}`);
    }

    getCachePath(url) {
        return path.resolve(`${this.cacheDir}/${this.hashForUrl(url)}`);
    }

    isCached(url) {
        try {
            return fs.existsSync(this.getCachePath(url));
        } catch(err) {
            return false;
        }
    }

    fromCache(url) {
        return  fs.createReadStream(this.getCachePath(url));
    }

    toCache(url) {
        return  fs.createWriteStream(this.getCachePath(url));
    }

    load(url) {

        console.log(this.isCached(url));

        if(this.isCached(url)) {
            return this.fromCache(url);
        } else {
            // PUN WITH STREAMS
            let basePass = new PassThrough;
            let filePass = new PassThrough;
            let webPass = new PassThrough;

            basePass.pipe(webPass);
            basePass.pipe(filePass);
            filePass.pipe(this.toCache(url));

            let imgLoader = new ImageLoader();
                imgLoader.load(url).pipe(basePass);

            return webPass;
        }
    }
}

export default CacheLoader;