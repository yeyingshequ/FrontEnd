

/* 帖子模板 */
export default {
    name: 'Comment',
    path: '/Comment/:commentId/:floor?',
    component: () => import('@/pages/Comment/index.vue'),
    meta: { hasTop: true }
}
