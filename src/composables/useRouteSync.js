import { watch, onScopeDispose } from 'vue'
import { useRoute } from 'vue-router'
import { useStorefrontStore } from '../stores/storefront'
export function useRouteSync() {
  const route = useRoute(),
    store = useStorefrontStore()
  let timer
  store.initialize()
  watch(
    () => route.params.id,
    (id) => {
      if (id) {
        const product = store.findProduct(Number(id))
        if (product && store.productId !== product.id) store.selectProduct(product)
      }
    },
    { immediate: true },
  )
  watch(
    () => store.noticeId,
    () => {
      clearTimeout(timer)
      timer = setTimeout(() => (store.notice = ''), 3000)
    },
  )
  watch(
    () => [store.color, store.size],
    () => (store.qty = Math.min(store.qty, Math.max(1, store.stock))),
  )
  onScopeDispose(() => clearTimeout(timer))
}
