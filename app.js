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

const homeDataRouter = require('./routes/homeDataRouter')

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

// ghostBC 提供首页数据 
app.use('/homeData', homeDataRouter);

app.get("/test", function (req, res) {
    res.send('hello world');
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

