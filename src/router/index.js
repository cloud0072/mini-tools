import {createRouter, createWebHistory} from "vue-router";
import SideBarLayout from "@/layout/SideBarLayout.vue";

export const menus = [
  {
    path: '/tools/encode',
    name: 'encode',
    meta: {title: '编码解码', icon: 'CodeOutlined'},
    component: () => import('@/views/tools/encode.vue'),
  },
  {
    path: '/tools/qrcode',
    name: 'qrcode',
    meta: {title: '二维码', icon: 'QrcodeOutlined'},
    component: () => import('@/views/tools/qrcode.vue'),
  },
]

const staticRoutes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/tools/encode',
  },
  {
    path: '/tools',
    name: 'Tools',
    component: SideBarLayout,
    children: menus,
  },
  {
    path: '/404',
    name: 'Exception404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    redirect: '/404'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.VITE_APP_PUBLIC_PATH),
  routes: staticRoutes,
});
export default router;
