const multer = require('multer');

const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: (request, file, cb) => {
//     cb(null, './uploads/');
//   },

//   filename: (request, file, cb) => {
//     cb(
//       null,
//       file.fieldname + '- ' + Date.now() + '-' + file.originalname,
//     );
//   },
// });

const fileFilter = (request, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
});

module.exports = upload;
