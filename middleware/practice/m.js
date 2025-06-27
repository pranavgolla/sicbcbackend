const multer = require('multer');
const path = require('path');

const createUploader = (uploadFolder) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadFolder); // dynamic folder
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = allowedTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only .jpg, .jpeg, .png files are allowed!'));
        }
    };

    return multer({
        storage: storage,
        limits: { fileSize: 1024 * 1024 * 2 }, // 2MB max
        fileFilter: fileFilter
    });
};

module.exports = createUploader;
