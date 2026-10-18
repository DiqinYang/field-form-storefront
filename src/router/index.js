import { createRouter, createWebHashHistory } from 'vue-router'
import { products } from '../data/products'
export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', meta: { section: 'shop' }, component: () => import('../views/ShopView.vue') },
    {
      path: '/products/:id',
      meta: { section: 'product' },
      beforeEnter: (to) => (products.some((p) => p.id === Number(to.params.id)) ? true : '/'),
      component: () => import('../views/ProductView.vue'),
    },
    { path: '/bag', meta: { section: 'cart' }, component: () => import('../views/BagView.vue') },
    {
      path: '/orders',
      meta: { section: 'orders' },
      component: () => import('../views/OrdersView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
