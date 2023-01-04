import request from '@/api/request'

/******************************用户相关的借口******************************/
//请求登录接口

export const loginApi = (params: object) => request({ url: '/login', method: 'post', data: params })

//请求注册接口
export const registerApi = (params: object) => request({ url: '/register', method: 'post', data: params })

//获取用户信息'/u'
export const getUserInfo = (params: object) => request({ url: '/userinfo', method: 'get', params: params })

//获取id,用户名,头像等基本信息

export const getMyInfo = () => request.get('/myinfo')

//修改密码接口
export const updatePasswordApi = (params: object) =>
  request({ url: '/updatepassword', method: 'post', data: params })
/******************************社区相关的接口******************************/

//获取社区的信息
export const getCmtyInfo = (params: object) => request({ url: '/cmtyinfo', method: 'get', params })

//获取社区帖子信息
export const getCmtyPosts = (params: object) => request({ url: '/cmtyposts', method: 'get', params })

//获取社区广场信息
export const getCmtySquareCardList = (params: object) =>
  request({ url: '/cmtySquareCardList', method: 'get', params })

//创建社区
export const createCmty = (params: object) => request({ url: '/createcmty', method: 'post', data: params })

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


/******************************帖子相关的接口******************************/

//获取帖子的信息
export const getPostInfo = (params: object) => request({ url: '/postinfo', method: 'get', params })

//获取首页导航信息
export const getHomePostCard = () => request({ url: '/homepostcard', method: 'get' })

//获取发现板块信息
export const getDiscoverPostCard = () => request({ url: '/discoverpostcard', method: 'get' })

//获取收藏导航板块信息
export const getSavedPostCard = () => request({ url: '/savedpostcard', method: 'get' })


//发主题帖
export const sendPost = (params: object) => request({ url: '/sendpost', method: 'post', data: params })

//发评论
export const sendComment = (params: object) => request({ url: '/sendcomment', method: 'post', data: params })

//发回复
export const sendReply = (params: object) => request({ url: '/sendreply', method: 'post', data: params })

//收藏帖子
export const savePost = (params: object) => request({ url: '/savepost', method: 'post', data: params })

//屏蔽帖子
export const hidePost = (params: object) => request({ url: '/hidepost', method: 'post', data: params })
