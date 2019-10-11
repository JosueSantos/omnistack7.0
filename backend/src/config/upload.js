//importa multer para resolver upload
const multer = require('multer');
//importa path (padrao do node) que resolve os caminhos
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        //path.resolve resolve o destino do arquivo para a pasta uploads no projeto
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        },
    }),
};