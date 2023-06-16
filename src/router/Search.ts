


export default {
    name: 'Search',
    path: '/search',
    component: () => import('@/pages/Search/Search.vue'),
    redirect: '/search/post',
    children: [
        {
            name: 'SearchPost',
            path: 'post/:keyWords?',
            component: () => import('@/pages/Search/SearchPost/SearchPost.vue'),
            meta: { keepSearchKeyWords: true }
        },
        {

            name: 'SearchComment',
            path: 'comment/:keyWords?',
            component: () => import('@/pages/Search/SearchComment/SearchComment.vue'),
            meta: { keepSearchKeyWords: true }
        },
        {

            name: 'SearchCmty',
            path: 'community/:keyWords?',
            component: () => import('@/pages/Search/SearchCmty/SearchCmty.vue'),
            meta: { keepSearchKeyWords: true }
        },
        {

            name: 'SearchUser',
            path: 'user/:keyWords?',
            component: () => import('@/pages/Search/SearchUser/SearchUser.vue'),
            meta: { keepSearchKeyWords: true }
        },
    ],
}
