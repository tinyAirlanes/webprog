const multer = require('multer');
const path = require('path');

const MediaRepository = require('./../repositories/mediaRepository');
const mediaRepository = new MediaRepository(path.resolve(__dirname, '../data/media'));

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, mediaRepository.path);
        },
        filename: (req, file, cb) => {
            const fileFormat = file.mimetype.split('/')[1];
            cb(null, `${String(mediaRepository.getNextId())}.${fileFormat}`);
        },
    }),
}).any()

module.exports = {
    getMediaById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id < 1) {
                res.status(400).send('Incorrect id');
            }
            else {
                const media = mediaRepository.getMediaPath(id);
                if (media) {
                    res.status(200).send(media);
                }
                else {
                    res.status(404).send('Not found!');
                }
            }
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    },

    addMedia(req, res) {
        try {
            upload(req, res, (err) => {
                if (err) {
                    res.status(400).send(e.message);
                }
                else if (req.files) {
                    mediaId = mediaRepository.getNextId();
                    res.status(201).json({ id: mediaId });
                    mediaRepository.incrementId();
                }
            })
        }
        catch (e) {
            res.status(400).send(e.message);
        }
    }
};
