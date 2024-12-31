const express = require('express');
const router = express.Router();
const {Article} = require('../../models')
const {Op} = require('sequelize')
const {successHandler,errorHandler} = require('../../utils/functionTools')
/**
 * @api {get} /article/query 获取文章列表
 * @author fengwei
 */
router.get('/query', async function(req, res, next) {
  try {
    const query = req.query; // 查询条件
    const current = Math.abs(Number(query.current)) || 1; // 当前是第几页如果不传则默认为1
    const size = Math.abs(Number(query.size)) || 10; // 每页显示多少条数据如果不传则默认为10
    const offset = (current - 1) * size; // 计算offset
    const condition = { // 定义查询对象
      order: [['id', 'DESC']],
      offset,
      limit: size
    }
    if(query.title) { // 如果有title字段则添加到查询对象中
      condition.where = {
        title: {
          [Op.like]: `%${query.title}%`
        }
      }
    }
    const articles = await Article.findAndCountAll(condition); // 查询文章列表
    res.json({
      code: 200,
      status: true,
      message: '获取文章列表成功',
      data: {
        relult: articles.rows,
        pages:{
          size: size,
          current: current,
          total: articles.count,
        }
      }
    })
  }catch(error) {
    errorHandler(res, '获取文章列表失败', [error.message])
  }
});

/**
 * @api {get} /article/query/:id 获取文章详情
 * @author fengwei
 */
router.get('/query/:id', async function(req, res, next) {
  try {
    const params = req.params; // 查询条件
    if(!params.id) { // 如果没有id字段则返回错误
      res.status(400).json({
        status: false,
      })
      return
    }
    const article = await Article.findByPk(params.id); // 查询文章详情
    res.json({
      code: 200,
      status: true,
      message: '获取文章详情成功',
      data: article
    })
  }catch(error) {
    errorHandler(res, '获取文章详情失败', [error.message])
  }
});

/**
 * @api {post} /article/addList 添加文章
 * @author fengwei
 */
router.post('/addList', async function (req, res, next) {
  try {
    const data = req.body; // 查询条件
    const article = await Article.create(data); // 查询文章详情
    res.json({
      code: 200,
      status: true,
      message: '添加文章成功',
      data: article
    })
  } catch (error) {
    errorHandler(res, '添加文章失败', [error.message])
  }
});

/**
 * @api {put} /admin/updateList/addList 更新文章
 * @author fengwei
 */
router.put('/updateList/:id', async function (req, res, next) {
  try {
    const {id} = req.params; // 查询条件
    const data = req.body; // 查询条件
    const article = await Article.findByPk(id); // 查询文章详情
    if(article){
      await article.update(data); // 更新文章
      res.json({
        code: 200,
        status: true,
        message: '更新文章成功',
        data: article
      })
    }
  } catch (error) {
    errorHandler(res, '更新文章失败', [error.message])
  }
});


/**
 * @api {put} /admin/updateList/addList 更新文章
 * @author fengwei
 */
router.delete('/deleteList/:id', async function (req, res, next) {
  try {
    const {id} = req.params; // 查询条件
    const article = await Article.findByPk(id); // 查询文章详情
    if(article){
      await article.destroy(); // 删除文章
      res.json({
        code: 200,
        status: true,
        message: '删除文章成功',
        data: article
      })
    }else {
      res.status(400).json({
        status: false,
        message: '删除文章失败',
        errors: ['文章不存在']
      })
    }
  } catch (error) {
    errorHandler(res, '删除文章失败', [error.message])
  }
});

module.exports = router;
