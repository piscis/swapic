import lwip from 'lwip';
import fileType from 'file-type';
import {PassThrough} from 'stream';
import _ from 'lodash';

class ImageResizer {

    constructor(buffer) {
        this.buffer = buffer
    }

    resize(x, y) {

        let mime = fileType(this.buffer);
        let bufferStream = new PassThrough;

        x = _.parseInt(x) || 200;
        y = _.parseInt(y) || undefined;

        lwip.open(this.buffer, mime.ext, function(err, image) {

            var cb = function(err, image) {
                image.toBuffer(mime.ext, function(err,buffer) {
                    bufferStream.end(buffer);
                });
            };

            if(y) {
                image.resize(x, y, cb);
            } else {
                // calculate scale factor
                var scale = _.round(1 * x / image.width(),2);
                image.scale(scale, cb);
            }
        });

        return bufferStream;
    }
}

export default ImageResizer;