const mediaRouter = require('express').Router();
const mediaController = require('../controllers/mediaController');

mediaRouter
    /**
    * @route POST /api/media
    * @group Media - upload and get images
    * @consumes multipart/form-data
    * @param {file} image.formData.required - uploaded image
    * @returns {Media.model} 201 - added image
    * @returns {Error} 400 - Bad request
    */
    .post('/', mediaController.addMedia)
    /**
    * return media by id
    * @route GET /api/media/{id}
    * @group Media - upload and get images
    * @param {integer} id.path.required - id of the media - eg: 1
    * @returns 200 - media object
    * @returns {Error} 404 - Media not found
    */
    .get('/:id', mediaController.getMediaById)

module.exports = mediaRouter;