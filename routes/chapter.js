const express = require('express');
const { createChapter, getChapter } = require('../controllers/chapter');
// const { authenticate } = require('../middleware/authenticate');
const { uploadChapterValidator } = require('../utils/validator');

const router = express.Router({ mergeParams: true });

router.post(
  '/',
  // authenticate,
  uploadChapterValidator,
  createChapter
);
router.get('/:chapterId', getChapter);

module.exports = router;
