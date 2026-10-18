import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStorefrontStore } from '../stores/storefront'
import { money, art, swatch, available, statusText, stage } from '../utils/catalogue'
export function useWorkspace() {
  const store = useStorefrontStore(),
    router = useRouter(),
    route = useRoute()
  const paths = { shop: '/', cart: '/bag', orders: '/orders' }
  const screen = computed(() => route.meta.section || 'shop')
  function go(value) {
    store.orderDetail = null
    store.cancelConfirm = false
    return router.push(paths[value] || '/')
  }
  function browseCategory(category) {
    store.category = category
    return go('shop')
  }
  function openBag() {
    store.notice = ''
    return go('cart')
  }
  function closeOrder() {
    store.orderDetail = null
    store.cancelConfirm = false
  }
  function openProduct(product) {
    store.selectProduct(product)
    return router.push('/products/' + product.id)
  }
  function createOrder() {
    const order = store.createOrder()
    if (order) go('orders')
    return order
  }
  const browse = () => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })
  return {
    ...storeToRefs(store),
    findProduct: store.findProduct,
    resetFilters: store.resetFilters,
    removeLine: store.removeLine,
    applyCoupon: store.applyCoupon,
    cancelOrder: store.cancelOrder,
    browseCategory,
    openBag,
    closeOrder,
    screen,
    go,
    openProduct,
    createOrder,
    browse,
    money,
    art,
    swatch,
    available,
    statusText,
    stage,
    addToCart: store.addToCart,
    changeQuantity: store.changeQuantity,
  }
}
