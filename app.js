// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const config = require('./config/config');
// const routes = require('./routes');

// const app = express();

// // 解析请求体
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // 跨域支持
// app.use(cors());

// // 安全设置
// app.use(helmet());

// // 记录请求日志
// app.use(morgan('combined'));

// // 挂载路由
// app.use('/api', routes);

// // 错误处理中间件
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: 'Internal Server Error'
//   });
// });

// // 启动应用
// app.listen(config.port, () => {
//   console.log(`Server started on port ${config.port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const config = require('./config/config');
const authRouter = require('./routes/auth');
const comicRouter = require('./routes/comic');
const chapterRouter = require('./routes/chapter');

const app = express();

mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

if (config.env === 'development') {
  app.use(morgan('dev'));
}

app.use('/auth', authRouter);
app.use('/comics', comicRouter);
app.use('/comics/:comicId/chapters', chapterRouter);
app.get("/test", function (req, res) {
    res.send({ "data": { "bannerNovels": [ { "id": 208707, "src": "https://oss.mkzcdn.com/image/20200630/5efa95c148edf-750x500.jpg!banner-1400-x" }, { "id": 214028, "src": "https://oss.mkzcdn.com/image/20200420/5e9d737ddc5e2-750x500.jpg!banner-1400-x" }, { "id": 211189, "src": "https://oss.mkzcdn.com/image/20200630/5efa965c269d1-750x500.jpg!banner-1400-x" }, { "id": 215991, "src": "https://oss.mkzcdn.com/image/20210831/612d8b1025a3e-1200x800.jpg!banner-1400-x" } ], "kzjpNovels": [ { "id": 212495, "novelName": "地府我开的", "desc": "业障不除三生七世永堕阎罗", "src": "https://oss.mkzcdn.com/comic/cover/20190329/5c9dd7bc36c89-568x320.jpg!cover-400-x" }, { "id": 211685, "novelName": "星梦偶像计划", "desc": "少女独自前行，为履约踏上星途", "src": "https://oss.mkzcdn.com/comic/cover/20200118/5e229da3a0e66-762x429.jpg!cover-400-x" }, { "id": 212470, "novelName": "万丈光芒不及你", "desc": "为爱顶罪遭背叛", "src": "https://oss.mkzcdn.com/comic/cover/20181019/5bc93f4158a96-711x400.jpg!cover-400-x" }, { "id": 214647, "novelName": "封·禁神录", "desc": "全新的角度诠释封神榜", "src": "https://oss.mkzcdn.com/comic/cover/20191023/5daff2655cb04-711x400.jpg!cover-400-x" } ], "djzpNovels": { "hot": { "id": 208701, "novelName": "花千骨", "desc": "跨越仙妖的师徒恋", "fireNumber": "2.09亿", "src": "https://oss.mkzcdn.com/image/20191009/5d9d76f1030cd-750x422.jpg!banner-600-x" }, "novelList": [ { "id": 208644, "novelName": "凤逆天下", "desc": "少女杀手魂穿飒爽复仇", "src": "https://oss.mkzcdn.com/comic/cover/20210707/60e567b94a6fb-750x999.png!cover-400-x" }, { "id": 208645, "novelName": "寻找前世之旅", "desc": "承接各类前世的委托", "src": "https://oss.mkzcdn.com/comic/cover/20210203/601a09656b366-750x999.jpg!cover-400-x" }, { "id": 209533, "novelName": "我被总裁黑上了！", "desc": "得不到我就黑我？？", "src": "https://oss.mkzcdn.com/comic/cover/20210526/60ae144e2817c-750x1000.jpg!cover-400-x" }, { "id": 208646, "novelName": "血族禁域", "desc": "与命运抗争的三姐妹", "src": "https://oss.mkzcdn.com/comic/cover/20181106/5be15681edc19-600x800.jpg!cover-400-x" }, { "id": 214705, "novelName": "某天成为王的女儿", "desc": "穿越成小萝莉做王的女儿", "src": "https://oss.mkzcdn.com/comic/cover/20190715/5d2c2380f3b25-750x999.jpg!cover-400-x" }, { "id": 214716, "novelName": "万古神王", "desc": "这一世我为万古神王！", "src": "https://oss.mkzcdn.com/comic/cover/20190729/5d3ef42db9c05-750x999.jpg!cover-400-x" } ], "adNovel": { "id": 214368, "src": "https://oss.mkzcdn.com/image/20191009/5d9d764920f14-750x280.jpg!banner-600-x" } }, "sszkNovels": { "topTwo": [ { "id": 213851, "src": "https://oss.mkzcdn.com/comic/cover/20190325/5c983ee90a768-750x999.jpg!cover-400-x", "novelName": "我和26岁美女房客", "desc": "和美女小姐姐住一起,一起", "type": "热血", "weekVisit": "8.6万" }, { "id": 216195, "src": "https://oss.mkzcdn.com/comic/cover/20210805/610ba4543d637-750x999.jpg!cover-400-x", "novelName": "临兵斗者", "desc": "帝尊复生，重修九字真言之力", "type": "热血·玄幻·古风", "weekVisit": "11.94万" } ], "novelList": [ { "id": 215921, "novelName": "仙魔同修", "desc": "仙魔千年来互不相容，而他又该何去何从", "src": "https://oss.mkzcdn.com/comic/cover/20201216/5fd95bca04550-748x997.JPG!cover-400-x" }, { "id": 215943, "novelName": "凤归巢：冷王盛宠法医妃", "desc": "绝世医术搅动天下风云", "src": "https://oss.mkzcdn.com/comic/cover/20201225/5fe55d55a501e-750x999.jpg!cover-400-x" }, { "id": 215421, "novelName": "超级微信", "desc": "手机微信发生变异，升级开挂任意选！", "src": "https://oss.mkzcdn.com/comic/cover/20200411/5e91903ddc12e-750x999.jpg!cover-400-x" } ] } } });
});

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});
