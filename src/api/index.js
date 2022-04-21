import request from "@/utils/request";

// 查询文章列表
export const queryDataBase = (params) => {
  return request({
    url: '/article/list',
    method: 'get',
    params,
  })
}

// 查询文章
export const getArticle = (articleId) => {
  return request({
    url: '/article/' + articleId,
    method: 'get',
  })
}


/**
 * 查询数据库（归档）
 * @param
 * @returns 
 */
export const retriveDataBase = () => {
  return request({
    url: '/tag/list',
    method: 'get',
  })
}

/**
 * 
 * @param {String} pageId 
 * @returns 
 */
export const retrievePage = (pageId) => {
  return request({
    url: '/page/retrieve/' + pageId,
    method: 'get',
  })
}

// 查询标签
export const listTags = () => {
  return request({
    url: '/tag/list',
    method: 'get',
  })
}

// 查询专题
export const listTopics = () => {
  return request({
    url: '/topic/list',
    method: 'get',
  })
}

// 添加评论
export const addComment = (data) => {
  return request({
    url: '/comment',
    method: 'post',
    data
  })
}

// 获得评论
export const listComment = (params) => {
  return request({
    url: '/comment/list/out',
    method: 'get',
    params
  })
}