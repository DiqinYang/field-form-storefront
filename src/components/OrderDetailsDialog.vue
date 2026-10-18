<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import { ref } from 'vue'
import { useDialog } from '../composables/useDialog'
const dialog = ref(null)
useDialog(dialog, () => {
  orderDetail.value = null
  cancelConfirm.value = false
})
const { closeOrder, orderDetail, cancelConfirm, money, art, findProduct, stage, cancelOrder } =
  useWorkspace()
</script>
<template>
  <div class="modal-overlay" @click.self="orderDetail = null">
    <section
      ref="dialog"
      class="order-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Demo order details"
    >
      <button class="close" @click="closeOrder" aria-label="Close order details">×</button>
      <div class="eyebrow">FICTIONAL ORDER / LOCAL DEMO</div>
      <h2>{{ orderDetail.id }}</h2>
      <p>
        {{ orderDetail.date }} ·
        <span class="status-pill" :class="orderDetail.status.toLowerCase()">{{
          orderDetail.status
        }}</span>
      </p>
      <div class="timeline">
        <div
          v-for="(s, i) in ['Processing', 'Shipped', 'Delivered']"
          :class="{ complete: stage(orderDetail.status) >= i }"
        >
          <i></i><span>{{ s }}</span>
        </div>
      </div>
      <div v-for="l in orderDetail.lines" class="modal-line">
        <img :src="art(findProduct(l.id))" :alt="findProduct(l.id).name" />
        <div>
          <b>{{ findProduct(l.id).name }}</b>
          <p>{{ l.color }} / {{ l.size }} · Qty {{ l.qty }}</p>
        </div>
        <span>{{ money(findProduct(l.id).price * l.qty) }}</span>
      </div>
      <div class="modal-totals">
        <p>
          Subtotal <b>{{ money(orderDetail.subtotal) }}</b>
        </p>
        <p>
          Shipping <b>{{ money(orderDetail.shipping) }}</b>
        </p>
        <p v-if="orderDetail.discount">
          Discount <b>−{{ money(orderDetail.discount) }}</b>
        </p>
        <h3>
          Total <b>{{ money(orderDetail.total) }}</b>
        </h3>
      </div>
      <div v-if="orderDetail.status === 'Processing'" class="cancel-order">
        <button v-if="!cancelConfirm" class="text-link" @click="cancelConfirm = true">
          Cancel this demo order
        </button>
        <div v-else>
          <p>Cancel this fictional order? No real transaction is affected.</p>
          <button class="outline-button" @click="cancelConfirm = false">Keep order</button
          ><button class="dark-button" @click="cancelOrder">Confirm demo cancellation</button>
        </div>
      </div>
      <p class="modal-note">
        This timeline is illustrative. It is not connected to a carrier or payment system.
      </p>
    </section>
  </div>
</template>
