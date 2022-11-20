import Communities from '@/pages/Communities'
import Joined from '@/pages/Communities/Joined'
import Square from '@/pages/Communities/Square'
import Favorite from "@/pages/Communities/Favorite";
import Recent from "@/pages/Communities/Recent";
/* 社区 */
export default {
    name: 'Communities',
    path: '/communities',
    component: Communities,
    redirect: '/communities/joined',
    children: [{
        name: "Joined",
        path: "joined",
        component: Joined,
    }, {
        /* 社区广场 */
        name: "Square",
        path: "square/:category?",
        component: Square,
    }, {
        /* 特别关注 */
        name: "Favorite",
        path: "favorite",
        component: Favorite,
    }, {
        /* 最近逛过 */
        name: "Recent",
        path: "recent",
        component: Recent,
    }],
}