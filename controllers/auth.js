const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

async function register(req, res) {
  try {
    const { username, password } = req.body;
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: 'Username already exists'
      });
    }
    // 创建新用户
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      password: hashedPassword
    });
    // 生成 JWT token
    const token = jwt.sign(
      { id: newUser._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    res.status(201).json({
      message: 'User',
      token
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    // 检查用户是否存在
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: 'Incorrect username or password'
      });
    }
    // 检查密码是否正确
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Incorrect username or password'
      });
    }
    // 生成 JWT token
    const token = jwt.sign(
      { id: user._id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );
    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
}

module.exports = {
  register,
  login
};

