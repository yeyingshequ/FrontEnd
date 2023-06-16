import request from '@/api/request'

/******************************用户相关的借口******************************/
//请求登录接口
export const loginApi = (params: object) => request({ url: '/login', method: 'post', data: params })

//请求注册接口
export const registerApi = (params: object) => request({ url: '/register', method: 'post', data: params })

//获取用户信息'/u'
export const getUserInfo = (params: object) => request({ url: '/userinfo', method: 'get', params: params })
export const getUserInfoForV = (params: object) => request({ url: '/userinfoforv', method: 'get', params: params })

//更新用户用户关系表
export const updateUserUser = (params: object) => request({ url: '/updateuseruser', method: 'post', data: params })

//获取id,用户名,头像等基本信息
export const getMyInfo = () => request.get('/myinfo')

//修改密码接口
export const updatePassword = (params: object) =>
  request({ url: '/updatepassword', method: 'post', data: params })

//更新用户信息
export const updateUserInfo = (params: object) => request({ url: '/updateuserinfo', method: 'post', data: params })
export const updateUserAvatar = (params: object) => request({ url: '/updateuseravatar', method: 'post', data: params })
export const updateUserCover = (params: object) => request({ url: '/updateusercover', method: 'post', data: params })
//获取用户卡片
export const getUserCard = (params: object) => request({ url: '/usercard', method: 'get', params: params })
export const getUserCardForV = (params: object) => request({ url: '/usercardforv', method: 'get', params: params })
/******************************社区相关的接口******************************/

//获取社区的信息
export const getCmtyInfo = (params: object) => request({ url: '/cmtyinfo', method: 'get', params })
export const getCmtyInfoForV = (params: object) => request({ url: '/cmtyinfoforv', method: 'get', params })

//获取用户的社区卡片
export const getCmtyCard = (params: object) => request({ url: '/cmtycard', method: 'get', params })
export const getCmtyCardForV = (params: object) => request({ url: '/cmtycardforv', method: 'get', params })

//通过名字获取社区id
export const getCmtyIdByName = (params: object) => request({ url: '/getcmtyidbyname', method: 'get', params })
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





/******************************帖子相关的接口******************************/

//获取帖子的信息
export const getPostInfo = (params: object) => request({ url: '/postinfo', method: 'get', params })
export const getPostInfoForV = (params: object) => request({ url: '/postinfoforv', method: 'get', params })

//获取评论的信息
export const getCommentInfo = (params: object) => request({ url: '/commentinfo', method: 'get', params })
export const getCommentInfoForV = (params: object) => request({ url: '/commentinfoforv', method: 'get', params })

//获取用户的帖子卡片
export const getPostCard = (params: object) => request({ url: '/postcard', method: 'get', params })
export const getPostCardForV = (params: object) => request({ url: '/postcardforv', method: 'get', params })

//获取评论/回复卡片
export const getCommentCard = (params: object) => request({ url: '/commentcard', method: 'get', params })
export const getCommentCardForV = (params: object) => request({ url: '/commentcardforv', method: 'get', params })
//获取社区帖子信息
export const getCmtyPosts = (params: object) => request({ url: '/cmtyposts', method: 'get', params })

//获取发现板块信息
export const getDiscoverPostCard = () => request({ url: '/discoverpostcard', method: 'get' })

//查询通知
export const getNotiCard = (params: object) => request({ url: '/noticard', method: 'get', params })

//发主题帖
export const sendPost = (params: object) => request({ url: '/sendpost', method: 'post', data: params })
export const sendPostForV = (params: object) => request({ url: '/sendpostforv', method: 'post', data: params })

//发评论
export const sendComment = (params: object) => request({ url: '/sendcomment', method: 'post', data: params })
export const sendCommentForV = (params: object) => request({ url: '/sendcommentforv', method: 'post', data: params })
//发回复
export const sendReply = (params: object) => request({ url: '/sendreply', method: 'post', data: params })
export const sendReplyForV = (params: object) => request({ url: '/sendreplyforv', method: 'post', data: params })
/* //收藏帖子
export const savePost = (params: object) => request({ url: '/updateuserpost', method: 'post', data: params }) */

//屏蔽帖子
export const hidePost = (params: object) => request({ url: '/hidepost', method: 'post', data: params })
//更新帖子,评论和回复
export const updatePost = (params: object) => request({ url: '/updatepost', method: 'post', data: params })
export const updateComment = (params: object) => request({ url: '/updatecomment', method: 'post', data: params })
export const updateReply = (params: object) => request({ url: '/updatereply', method: 'post', data: params })
//更新用户帖子关系表
export const updateUserPost = (params: object) => request({ url: '/updateuserpost', method: 'post', data: params })
//更新用户帖关系表
export const updateUserComment = (params: object) => request({ url: '/updateusercomment', method: 'post', data: params })
//更新用户帖关系表
export const updateUserReply = (params: object) => request({ url: '/updateuserreply', method: 'post', data: params })



//特殊指令
export const specialOrder = () => request({ url: '/specialorder', method: 'post' })
