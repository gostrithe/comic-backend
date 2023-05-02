const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/config');
const Chapter = require('../models/Chapter');
const Comic = require('../models/Comic');
const { uploadChapterValidator } = require('../utils/validator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const { comicId } = req.params;
    const { chapterNumber } = req.body;
    const ext = path.extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filepath = `${comicId}/${chapterNumber}/${filename}`;
    req.filepath = filepath;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: config.upload.maxSize },
  fileFilter: (req, file, cb) => {
    if (!config.upload.allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  }
}).single('file');

async function createChapter(req, res) {
  try {
    const { comicId } = req.params;
    const { chapterNumber } = req.body;
    // 检查漫画是否存在
    const comic = await Comic.findById(comicId);
    if (!comic) {
      return res.status(404).json({
        message: 'Comic not found'
      });
    }
    // 检查章节是否已存在
    const existingChapter = await Chapter.findOne({
      comic: comicId,
      chapterNumber
    });
    if (existingChapter) {
      return res.status(409).json({
        message: 'Chapter already exists'
      });
    }
    // 上传图片
    upload(req, res, async err => {
      if (err) {
        return res.status(400).json({
          message: err.message
        });
      }
      // 创建章节
      const { filepath } = req;
      const newChapter = await Chapter.create({
        comic: comicId,
        chapterNumber,
        images: [filepath]
      });
      // 更新漫画信息
      const updatedComic = await Comic.findByIdAndUpdate(
        comicId,
        {
          $push: { chapters: newChapter._id }
        },
        { new: true }
      );
      res.status(201).json({
        message: 'Chapter created',
        chapter: newChapter,
        comic: updatedComic
      });
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

async function getChapter(req, res) {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId).populate('comic');
    if (!chapter) {
      return res.status(404).json({
        message: 'Chapter not found'
      });
    }
    res.status(200).json({
      chapter
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

module.exports = {
  createChapter,
  getChapter
};
