import { defineStore } from 'pinia'
import { products, createInitialCart } from '../data/products'
import { available } from '../utils/catalogue'
export const useStorefrontStore = defineStore('storefront', {
  state: () => ({
    category: 'All pieces',
    categories: ['All pieces', 'Clothing', 'Accessories', 'Home'],
    brand: 'All labels',
    brands: ['Field Studio', 'Morrow', 'Clay House'],
    search: '',
    sort: 'featured',
    priceRange: 'all',
    productId: 1,
    color: 'Oat',
    size: 'M',
    qty: 1,
    zoom: false,
    couponInput: '',
    couponApplied: false,
    couponError: false,
    couponMessage: '',
    orderStatus: 'All orders',
    orderStatuses: ['All orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    orderDetail: null,
    cancelConfirm: false,
    orders: [],
    products: structuredClone(products),
    cart: createInitialCart(),
    notice: '',
    noticeId: 0,
  }),
  getters: {
    filtered() {
      let a = this.products.filter(
        (p) =>
          (this.category === 'All pieces' || p.category === this.category) &&
          (this.brand === 'All labels' || p.brand === this.brand) &&
          (this.priceRange === 'all' ||
            (this.priceRange === 'under50' && p.price < 50) ||
            (this.priceRange === '50to75' && p.price >= 50 && p.price <= 75) ||
            (this.priceRange === 'over75' && p.price > 75)) &&
          (!this.search ||
            (p.name + ' ' + p.brand + ' ' + p.subtitle)
              .toLowerCase()
              .includes(this.search.toLowerCase())),
      )
      if (this.sort !== 'featured')
        a = a.slice().sort((a, b) => (this.sort === 'low' ? a.price - b.price : b.price - a.price))
      return a
    },
    stock() {
      return this.available(this.productId, this.color, this.size)
    },
    cartCount() {
      return this.cart.reduce((n, l) => n + l.qty, 0)
    },
    subtotal() {
      return this.cart.reduce((n, l) => n + this.findProduct(l.id).price * l.qty, 0)
    },
    shipping() {
      return this.subtotal >= 100 || this.subtotal === 0 ? 0 : 5
    },
    discount() {
      return this.couponApplied ? Math.round(this.subtotal * 10) / 100 : 0
    },
    total() {
      return Math.round((this.subtotal + this.shipping - this.discount) * 100) / 100
    },
    filteredOrders() {
      return this.orders.filter(
        (o) => this.orderStatus === 'All orders' || o.status === this.orderStatus,
      )
    },
    product() {
      return this.findProduct(this.productId) || this.products[0]
    },
  },
  actions: {
    findProduct(id) {
      return this.products.find((p) => p.id === id)
    },
    resetFilters() {
      this.category = 'All pieces'
      this.brand = 'All labels'
      this.search = ''
      this.sort = 'featured'
      this.priceRange = 'all'
    },
    addToCart() {
      if (!Number.isInteger(this.qty) || this.qty < 1 || this.stock <= 0) return
      const key = [this.productId, this.color, this.size].join('-')
      const line = this.cart.find((l) => l.key === key)
      if ((line ? line.qty : 0) + this.qty > this.stock) {
        this.toast('The bag quantity would exceed this demo variant’s stock.')
        return
      }
      if (line) line.qty += this.qty
      else
        this.cart.push({
          key,
          id: this.productId,
          color: this.color,
          size: this.size,
          qty: this.qty,
        })
      this.toast('Added to your demo bag')
    },
    removeLine(i) {
      this.cart.splice(i, 1)
      if (!this.cart.length) {
        this.couponApplied = false
        this.couponMessage = ''
        this.couponInput = ''
      }
    },
    applyCoupon() {
      if (this.couponInput.trim().toUpperCase() === 'DEMO10') {
        this.couponApplied = true
        this.couponError = false
        this.couponMessage = 'DEMO10 applied — 10% off the demo subtotal.'
      } else {
        this.couponApplied = false
        this.couponError = true
        this.couponMessage = 'Unknown demo code. Try DEMO10.'
      }
    },
    createOrder() {
      if (!this.cart.length) return
      const order = {
        id: 'DEMO-2026-' + String(1004 + this.orders.filter((o) => o.session).length),
        date: 'This session',
        status: 'Processing',
        lines: this.cart.map((l) => ({ ...l })),
        subtotal: this.subtotal,
        shipping: this.shipping,
        discount: this.discount,
        total: this.total,
        session: true,
      }
      this.orders.unshift(order)
      this.cart = []
      this.couponApplied = false
      this.couponInput = ''
      this.couponMessage = ''
      this.orderStatus = 'All orders'
      this.toast('Demo order created. No payment was made.')
      return order
    },
    cancelOrder() {
      if (this.orderDetail && this.orderDetail.status === 'Processing') {
        this.orderDetail.status = 'Cancelled'
        this.cancelConfirm = false
        this.toast('Fictional order cancelled. No real transaction was affected.')
      }
    },
    seedOrder(id, status, lines) {
      const subtotal = lines.reduce((n, l) => n + this.findProduct(l.id).price * l.qty, 0)
      return {
        id,
        date: '18 Oct 2026',
        status,
        lines,
        subtotal,
        shipping: subtotal >= 100 ? 0 : 5,
        discount: 0,
        total: subtotal + (subtotal >= 100 ? 0 : 5),
        session: false,
      }
    },
    available,
    toast(message) {
      this.notice = message
      this.noticeId++
    },
    selectProduct(product) {
      this.productId = product.id
      this.color = product.colors[0]
      this.size = product.sizes.includes('M') ? 'M' : product.sizes[0]
      this.qty = 1
      this.zoom = false
    },
    initialize() {
      if (!this.orders.length)
        this.orders = [
          this.seedOrder('DEMO-2026-1003', 'Processing', [
            { id: 2, color: 'Sage', size: 'M', qty: 1 },
            { id: 4, color: 'Clay', size: '350 ml', qty: 1 },
          ]),
          this.seedOrder('DEMO-2026-1002', 'Shipped', [
            { id: 3, color: 'Natural', size: 'One size', qty: 1 },
          ]),
          this.seedOrder('DEMO-2026-1001', 'Delivered', [
            { id: 5, color: 'Terracotta', size: 'S', qty: 1 },
            { id: 6, color: 'Sand', size: 'M', qty: 1 },
          ]),
        ]
    },
    changeQuantity(key, delta) {
      const line = this.cart.find((row) => row.key === key)
      if (!line) return
      line.qty = Math.max(
        1,
        Math.min(this.available(line.id, line.color, line.size), line.qty + delta),
      )
    },
  },
})
