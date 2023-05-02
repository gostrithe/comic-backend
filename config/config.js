const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'development';

const development = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI_DEV || 'mongodb://localhost:27017/myapp',
    url: process.env.DB_URL || 'mongodb://localhost:27017/myapp'
  },
  // jwt: {
  //   secret: process.env.JWT_SECRET
  // }
  jwt: {
    secret: process.env.JWT_SECRET || 'myappsecret',
    expiresIn: '1d'
  },
  upload: {
    maxSize: 1024 * 1024 * 10, // 10MB
    allowedTypes: ['image/jpeg', 'image/png']
  }
};

const production = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI_PROD
  },
  jwt: {
    secret: process.env.JWT_SECRET
  }
};

const config = {
  development,
  production
};

module.exports = config[env];


// module.exports = {
//   port: process.env.PORT || 3000,
//   db: {
//     url: process.env.DB_URL || 'mongodb://localhost:27017/myapp'
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET || 'myappsecret',
//     expiresIn: '1d'
//   },
//   upload: {
//     maxSize: 1024 * 1024 * 10, // 10MB
//     allowedTypes: ['image/jpeg', 'image/png']
//   }
// };
