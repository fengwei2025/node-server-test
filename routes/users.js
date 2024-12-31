var express = require('express');
var router = express.Router();
const {generateCaptcha,generateImgBase64} = require('../utils/functionTools')
//const { User } = require('../models/user')
const { User } = require('../models')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/addUserList', async function(req, res, next) {
  try {
    const data = req.body; // 查询条件
    console.log('1111',req.body)
     const user = await User.create(data);
     res.json({
       code: 200,
       msg: '注册成功',
       data: user
     })
  }catch (err) {
      console.log('err',err)
     res.json({
       code: 500,
       msg: '注册失败',
       data: err
     })
  }
});
router.get('/getCode', async function(req, res, next) {
  //generateCaptcha(req, res);
  generateImgBase64(req, res)
});

module.exports = router;
