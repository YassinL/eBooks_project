// const multer = require('multer');
// const moment = require('moment');

// // const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: (request, file, callback) => {
//     callback(null, 'uploads');
//   },

//   filename: (request, file, callback) => {
//     const date = moment().format('YYYY-MM-DD-HHmmss');
//     callback(null, `${file.fieldname}-${date}-${file.originalname}`);
//   },
// });

// const fileFilter = (request, file, callback) => {
//   if (
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/png'
//   ) {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// });

// module.exports = upload.single('file');

const multer = require('multer');
const moment = require('moment');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (request, file, callback) => {
    const [name] = file.originalname
      .replace(' ', '-')
      .substring(0, 19)
      .split('.');
    const date = moment().format('YYYY-MM-DD-HHmmss');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${date}_${name}.${extension}`);
  },
});

module.exports = multer({ storage }).single('image');
