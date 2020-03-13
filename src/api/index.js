import request from './request'


// const baseurl='/api1'

const baseurl='http://127.0.0.1:5000'

//登陆请求
export const reqLogin= (loginname,password) =>request(baseurl+'/login', {loginname,password},'POST')
//添加用户
export const addData= (params) =>request(baseurl+'/add', {...params},'POST')
//请求数据
export const reqData= () =>request(baseurl+'/query')
//修改数据
export const modifyData= (params) =>request(baseurl+'/modify', {...params},'POST')
//删除数据
export const delData= (id) =>request(baseurl+'/delete', {id},'POST')