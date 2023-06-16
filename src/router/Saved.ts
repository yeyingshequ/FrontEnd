
export default {
    name: 'Saved',
    path: '/saved',
    component: () => import('@/pages/Saved/index.vue'),
    redirect: '/saved/savedpost',
    children: [
        {
            name: 'SavedPost',
            path: 'savedpost',
            component: () => import('@/pages/Saved/SavedPost/SavedPost.vue'),
        },
        {
            /* 社区广场 */
            name: 'SavedComment',
            path: 'savedcomment',
            component: () => import('@/pages/Saved/SavedComment/SavedComment.vue')
        }
    ],
}

