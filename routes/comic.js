const express = require('express');
const { createComic, getComic, getComics } = require('../controllers/comic');
// const { authenticate } = require('../middleware/authenticate');
const { uploadComicValidator } = require('../utils/validator');

const router = express.Router();

router.post(
  '/',
  // authenticate,
  uploadComicValidator,
  // createComic
);
router.get('/', 
// getComics
);
router.get('/:comicId', 
// getComic
);

module.exports = router;
