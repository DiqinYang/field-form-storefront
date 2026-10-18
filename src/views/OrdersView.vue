<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const {
  orderStatus,
  orderStatuses,
  orderDetail,
  orders,
  money,
  art,
  findProduct,
  statusText,
  filteredOrders,
} = useWorkspace()
</script>
<template>
  <section class="page-title">
    <div class="eyebrow">YOUR COLLECTION, ON ITS WAY</div>
    <h1>My orders</h1>
    <p>Track the journey of your fictional everyday finds.</p>
  </section>
  <div class="order-notice">
    ◇ &nbsp; All orders are fictional. Statuses and timelines are simulated; no payments or
    deliveries occur.
  </div>
  <div class="order-tabs">
    <button
      v-for="s in orderStatuses"
      :class="{ selected: orderStatus === s }"
      @click="orderStatus = s"
    >
      {{ s }}
      <span>{{
        s === 'All orders' ? orders.length : orders.filter((o) => o.status === s).length
      }}</span>
    </button>
  </div>
  <div class="orders-list">
    <article v-for="o in filteredOrders" class="order-card" :key="o.id">
      <div class="order-card-head">
        <div>
          <small>ORDER NUMBER</small><b>{{ o.id }}</b>
        </div>
        <div>
          <small>PLACED ON</small><span>{{ o.date }}</span>
        </div>
        <div>
          <small>TOTAL</small><span>{{ money(o.total) }}</span>
        </div>
        <span class="status-pill" :class="o.status.toLowerCase()">{{ o.status }}</span>
      </div>
      <div class="order-card-body">
        <div class="order-preview">
          <img
            v-for="l in o.lines.slice(0, 2)"
            :src="art(findProduct(l.id))"
            :alt="findProduct(l.id).name"
          />
          <div>
            <h3>
              {{ findProduct(o.lines[0].id).name
              }}{{ o.lines.length > 1 ? ' + ' + (o.lines.length - 1) + ' more' : '' }}
            </h3>
            <p>
              {{ o.lines.reduce((n, l) => n + l.qty, 0) }}
              {{ o.lines.reduce((n, l) => n + l.qty, 0) === 1 ? 'item' : 'items' }} · Fictional
              order
            </p>
            <span>{{ statusText(o.status) }}</span>
          </div>
        </div>
        <button class="outline-button" @click="orderDetail = o">View order →</button>
      </div>
    </article>
    <div v-if="!filteredOrders.length" class="empty">
      <h2>No orders in this chapter.</h2>
      <p>Choose another status or create a local demo order from your bag.</p>
    </div>
  </div>
</template>
