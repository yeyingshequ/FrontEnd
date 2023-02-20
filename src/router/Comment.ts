import Comment from '@/pages/Comment/index.vue'

/* 帖子模板 */
export default {
    name: 'Comment',
    path: '/Comment/:commentId',
    component: Comment,
    meta: { hasTop: true }
}
