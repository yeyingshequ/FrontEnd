import Search from '@/pages/Search/Search.vue'
import SearchPost from '@/pages/Search/SearchPost/SearchPost.vue'
import SearchComment from '@/pages/Search/SearchComment/SearchComment.vue'
import SearchCmty from '@/pages/Search/SearchCmty/SearchCmty.vue'
import SearchUser from '@/pages/Search/SearchUser/SearchUser.vue'


export default {
    name: 'Search',
    path: '/search',
    component: Search,
    redirect: '/search/post',
    children: [
        {
            name: 'SearchPost',
            path: 'post/:keyWords?',
            component: SearchPost,
            meta: { keepSearchKeyWords: true }
        },
        {

            name: 'SearchComment',
            path: 'comment/:keyWords?',
            component: SearchComment,
            meta: { keepSearchKeyWords: true }
        },
        {

            name: 'SearchCmty',
            path: 'community/:keyWords?',
            component: SearchCmty,
            meta: { keepSearchKeyWords: true }
        },
        {

            name: 'SearchUser',
            path: 'user/:keyWords?',
            component: SearchUser,
            meta: { keepSearchKeyWords: true }
        },
    ],
}
