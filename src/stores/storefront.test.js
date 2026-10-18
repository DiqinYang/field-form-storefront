import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useStorefrontStore } from './storefront'

beforeEach(() => setActivePinia(createPinia()))

describe('bag and order invariants', () => {
  it('applies a coupon, snapshots totals, clears the bag and cancels only processing orders', () => {
    const store = useStorefrontStore()
    store.initialize()
    expect(store.subtotal).toBe(104)
    store.couponInput = ' demo10 '
    store.applyCoupon()
    expect(store.total).toBe(93.6)
    const order = store.createOrder()
    expect(order.total).toBe(93.6)
    expect(order.lines).toHaveLength(2)
    expect(store.cart).toHaveLength(0)
    expect(store.createOrder()).toBeUndefined()
    store.cart.push({ key: 'new', id: 4, color: 'Clay', size: '350 ml', qty: 1 })
    expect(order.lines).toHaveLength(2)
    store.orderDetail = store.orders[0]
    store.cancelOrder()
    expect(store.orders[0].status).toBe('Cancelled')
    const shipped = store.orders.find((row) => row.status === 'Shipped')
    store.orderDetail = shipped
    store.cancelOrder()
    expect(shipped.status).toBe('Shipped')
  })

  it('rejects unavailable variants and combined quantities over stock', () => {
    const store = useStorefrontStore()
    store.color = 'Charcoal'
    store.size = 'L'
    store.addToCart()
    expect(store.cartCount).toBe(2)
    store.color = 'Oat'
    store.size = 'M'
    store.qty = 8
    store.addToCart()
    expect(store.cartCount).toBe(2)
    store.changeQuantity('1-Oat-M', 100)
    expect(store.cart[0].qty).toBe(8)
    store.changeQuantity('1-Oat-M', -100)
    expect(store.cart[0].qty).toBe(1)
  })

  it('keeps shipping and discounts correct when the subtotal crosses the free-shipping threshold', () => {
    const store = useStorefrontStore()
    store.removeLine(1)
    store.couponInput = 'DEMO10'
    store.applyCoupon()
    expect(store.shipping).toBe(5)
    expect(store.total).toBe(66.2)
    store.couponInput = 'INVALID'
    store.applyCoupon()
    expect(store.discount).toBe(0)
    store.removeLine(0)
    expect(store.total).toBe(0)
    expect(store.couponApplied).toBe(false)
  })
})
