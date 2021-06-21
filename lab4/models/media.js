/**
 * @typedef Media
 * @property {integer} id
 * @property {string} fileName - file name
 * @property {string} filePath - file path
 */

 class Media {
    constructor(id, fileName, filePath = null) {
        this.id = id;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}

module.exports = Media;