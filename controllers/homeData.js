// 返回首页数据
const mongoose = require("mongoose");
const config = require("../config/config");

const model = mongoose
  .createConnection(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .model("homeData", {data: {type: Object}}, "homeData");

function fetchHomeData(request, response) {
  // 读取数据库中的数据
  let data = null;
  model.find({}).then((res) => {
    console.log("读取数据库中的首页数据2", res);
    data = res[0];

    response.send(data);
  });
}

function updateData(request, response) {
  console.log('请求request', request.body.dataObj);
  
  model.findByIdAndUpdate('6451d2fe8445434ab58077e1', {
    data: request.body.dataObj
  }).then(res => {
    console.log('首页数据更新成功-------');
    
    response.send(request.body.dataObj);
  })
}

module.exports = {
  fetchHomeData,
  updateData,
};
