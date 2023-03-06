import request from '@/api/request'

/******************************用户相关的借口******************************/
//请求登录接口
export const loginApi = (params: object) => request({ url: '/login', method: 'post', data: params })

//请求注册接口
export const registerApi = (params: object) => request({ url: '/register', method: 'post', data: params })

//获取用户信息'/u'
export const getUserInfo = (params: object) => request({ url: '/userinfo', method: 'get', params: params })

//更新用户用户关系表
export const updateUserUser = (params: object) => request({ url: '/updateuseruser', method: 'post', data: params })

//获取id,用户名,头像等基本信息
export const getMyInfo = () => request.get('/myinfo')

//修改密码接口
export const updatePasswordApi = (params: object) =>
  request({ url: '/updatepassword', method: 'post', data: params })
//获取用户卡片
export const getUserCard = (params: object) => request({ url: '/usercard', method: 'get', params: params })
/******************************社区相关的接口******************************/

//获取社区的信息
export const getCmtyInfo = (params: object) => request({ url: '/cmtyinfo', method: 'get', params })

//获取用户的帖子卡片
export const getCmtyCard = (params: object) => request({ url: '/cmtycard', method: 'get', params })

//获取社区广场信息
export const getCmtySquareCardList = (params: object) =>
  request({ url: '/cmtysquarecard', method: 'get', params })

//创建社区
export const createCmty = (params: object) => request({ url: '/createcmty', method: 'post', data: params })

//更新用户社区关系表
export const updateUserCmty = (params: object) => request({ url: '/updateusercmty', method: 'post', data: params })

//加入社区
export const joinCmty = (params: object) => request({ url: '/joincmty', method: 'post', data: params })

//退出社区
export const unJoinCmty = (params: object) => request({ url: '/unjoincmty', method: 'post', data: params })

//特别关注
export const favoriteCmty = (params: object) => request({ url: '/favoritecmty', method: 'post', data: params })

//取消特别关注
export const unFavoriteCmty = (params: object) => request({ url: '/unfavoritecmty', method: 'post', data: params })

//查询加入的社区
export const getJoinedCmty = () => request({ url: '/getjoinedcmty', method: 'get' })

//查询特别关注的社区
export const getFavoriteCmty = () => request({ url: '/getfavoritecmty', method: 'get' })

//查询最近逛过的社区
export const getRecentCmty = () => request({ url: '/getrecentcmty', method: 'get' })

//查询用户的社区
export const getUserCmty = (params: object) => request({ url: '/getusercmty', method: 'get', params })


/******************************帖子相关的接口******************************/

//获取帖子的信息
export const getPostInfo = (params: object) => request({ url: '/postinfo', method: 'get', params })

//获取评论的信息
export const getCommentInfo = (params: object) => request({ url: '/commentinfo', method: 'get', params })

//获取用户的帖子卡片
export const getPostCard = (params: object) => request({ url: '/postcard', method: 'get', params })

//获取社区帖子信息
export const getCmtyPosts = (params: object) => request({ url: '/cmtyposts', method: 'get', params })

//获取发现板块信息
export const getDiscoverPostCard = () => request({ url: '/discoverpostcard', method: 'get' })

//查询通知
export const getNotiCard = (params: object) => request({ url: '/noticard', method: 'get', params })

//发主题帖
export const sendPost = (params: object) => request({ url: '/sendpost', method: 'post', data: params })

//发评论
export const sendComment = (params: object) => request({ url: '/sendcomment', method: 'post', data: params })

//发回复
export const sendReply = (params: object) => request({ url: '/sendreply', method: 'post', data: params })

//收藏帖子
export const savePost = (params: object) => request({ url: '/updateuserpost', method: 'post', data: params })

//屏蔽帖子
export const hidePost = (params: object) => request({ url: '/hidepost', method: 'post', data: params })

//更新用户帖子关系表
export const updateUserPost = (params: object) => request({ url: '/updateuserpost', method: 'post', data: params })
//更新用户帖关系表
export const updateUserComment = (params: object) => request({ url: '/updateusercomment', method: 'post', data: params })
//更新用户帖关系表
export const updateUserReply = (params: object) => request({ url: '/updateuserreply', method: 'post', data: params })
