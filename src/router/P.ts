

/* 帖子模板 */
export default {
  name: 'P',
  path: '/p/:pid/:floor?',
  component: () => import('@/pages/P/index.vue'),
  meta: { hasTop: true }
}
