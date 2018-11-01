//
//  https://www.w3schools.com/jsref/dom_obj_image.asp
//  - naturalHeight, naturalWidth
//  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
//  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
//  https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
//  https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
//  https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
//  - atob(), btoa()
//
//  More than once I read that the image renders to 96 dpi.
//
var resizeBase64 = {
    version      : '0.9.8',
    defaultQ     : 0.7,
    base64String : '',

    //
    image : function (imageID, canvasID, size, imageQ) {
        var img   = document.getElementById(imageID);   // This can be set to `display:none;`etc, but must be loaded.
        var c     = document.getElementById(canvasID);  // This must be an HTML <canvas></canvas>
        var imgQ  = (imageQ) ? imageQ : resizeBase64.defaultQ; // If `Q` is not set, it defaults to `0.92` (per mozilla).
        var ratio = 1;

        // get the '2d' context - as in a drawable canvas
        var ctx  = c.getContext("2d");

        // short-circuit in no `size` given at all
        if ((! size.ratio) && (! size.height) && (! size.width)) {
            return null;
        }
        // `size.width` alone will set `size.height`
        if ((! size.ratio) && (! size.height)) {
            ratio       = (size.width/img.naturalWidth).toFixed(8);
            size.height = Math.floor(img.naturalHeight * ratio);
        }
        // `size.height` alone will set `size.width`
        if ((! size.ratio) && (! size.width)) {
            ratio      = (size.height/img.naturalHeight).toFixed(8);
            size.width = Math.floor(img.naturalWidth  * ratio);
        }
        console.log((size.ratio) ? size.ratio : ratio);
        // resize canvas to image destination size
        // any blank spots in the <canvas> will show up in the new image
        if (size.ratio) {
            if (size.ratio < 1.0) {
                c.width  = Math.floor(img.naturalWidth  * size.ratio)
                c.height = Math.floor(img.naturalHeight * size.ratio);
            } else {
                return null;
            }
        } else {
            c.width  = size.width;
            c.height = size.height;
        }

        // copy image to canvas, start at origin given (0,0), and resize (width,height)
        // canvas-size = image-target-size
        ctx.drawImage(img, 0, 0, c.width, c.height);

        // canvas image to JPEG `base64` string with given Q
        // save internally and return
        resizeBase64.base64String = c.toDataURL('image/jpeg', imgQ);
        return {'img': resizeBase64.base64String,
                'ratio': (size.ratio) ? size.ratio : ratio,
                'height': c.height,
                'width': c.width,
                'Q':imgQ};
    }
};
