import request from "@/api/request";
<<<<<<< HEAD
=======
import myInfo from "@/api/myInfo";
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708

/******************************用户相关的借口******************************/
//请求登录接口
export const loginApi = (params) => request({url: '/login', method: 'post', data: params})

//请求注册接口
export const registerApi = (params) => request({url: '/register', method: 'post', data: params})

//获取用户信息'/u'
export const getUserInfo = (params) =>request({url:'/userinfo',method:'get',params:params})

//获取id,用户名,头像等基本信息

<<<<<<< HEAD
export const getMyInfo = () => request.get('/myinfo')

//修改密码接口
export const updatePasswordApi = (params) => request({url: '/updatepassword', method: 'post', data: params})
=======
export const getMyInfo = () => myInfo.get('/myinfo')

//修改密码接口
export const updatePasswordApi = (params) => myInfo({url: '/updatepassword', method: 'post', data: params})
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
/******************************社区相关的借口******************************/

//获取社区的信息
export const getCmtyInfo = (params) =>request({url:'/cmtyinfo',method:'get',params})

//获取社区帖子信息
export const getCmtyHomePosts = (params)=>request({url:'/cmtyhomeposts',method:'get',params})

//获取社区广场信息
export const getCmtySquareInfo = (params)=>request({url:'/cmtysquareinfo',method:'get',params})

//创建社区
export const createCmty = (params) =>request({url:'/createcmty',method:'post', data: params})

<<<<<<< HEAD
//加入社区
export const joinCmty = (params) =>request({url:'/joincmty',method:'post', data: params})

//特别关注
export const favoriteCmty = (params) =>request({url:'/favoritecmty',method:'post', data: params})

//查询加入的社区
export const getJoinedCmty = () =>request({url:'/getjoinedcmty',method:'get'})

//查询特别关注的社区
export const getFavoriteCmty = () =>request({url:'/getfavoritecmty',method:'get'})

=======
>>>>>>> 235c9f042e7a1074c9cef0bb3cddcb4f9c865708
/******************************帖子相关的接口******************************/

//获取帖子的信息
export const getPostInfo = (params) =>request({url:'/postinfo',method:'get',params})

//获取发现板块信息
export const getDiscoverInfo = () =>request({url:'/discoverinfo',method:'get'})

//发主题帖
export const sendPost = (params) =>request({url:'/sendpost',method:'post', data: params})

//发评论
export const sendComment = (params) =>request({url:'/sendcomment',method:'post', data: params})

//发回复
export const sendReply = (params) =>request({url:'/sendreply',method:'post', data: params})



