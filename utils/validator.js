const { body } = require('express-validator');

const uploadComicValidator = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title is required'),
  body('author')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Author is required'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description is required'),
  body('coverImage')
    .custom((value, { req }) => {
      if (!req.file) {
        throw new Error('Cover image is required');
      }
      return true;
    })
];

const uploadChapterValidator = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title is required'),
  body('number')
    .isNumeric()
    .withMessage('Number is required'),
  body('pages.*')
    .custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error('Pages are required');
      }
      return true;
    })
];

module.exports = {
  uploadComicValidator,
  uploadChapterValidator
};
