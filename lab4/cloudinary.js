const config = require('./config');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

// in request handler with file
function handleFileUpload(req, res) {
    const fileObject = req.files.someFile;
    const fileBuffer = fileObject.data;
    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' },
        function (error, result) { 
            console.log(result, error) 
            // do stuff...
            // create web response
            res.send(result);
        })
        .end(fileBuffer);
    // ...
}

// Async result sample 
//
// {
//     public_id: 'mphd24cnlaiaapq7cewg',
//     version: 1540202333,
//     signature: 'b583ca8ec751e87de2e93e87aa4d843d94e99c76',
//     resource_type: 'raw',
//     created_at: '2018-10-22T09:58:53Z',
//     tags: [],
//     bytes: 3342,
//     type: 'upload',
//     etag: 'c65f76c0af61ac1c8b5806201a48628b',
//     placeholder: false,
//     url: 'http://res.cloudinary.com/rhadyniak/raw/upload/v1540202333/mphd24cnlaiaapq7cewg',
//     secure_url: 'https://res.cloudinary.com/rhadyniak/raw/upload/v1540202333/mphd24cnlaiaapq7cewg',
//     original_filename: 'file'
// }