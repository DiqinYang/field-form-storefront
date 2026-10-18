<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const {
  couponInput,
  couponError,
  couponMessage,
  money,
  applyCoupon,
  createOrder,
  subtotal,
  shipping,
  discount,
  total,
} = useWorkspace()
</script>
<template>
  <aside class="summary">
    <h2>A little summary</h2>
    <div>
      <span>Subtotal</span><b>{{ money(subtotal) }}</b>
    </div>
    <div>
      <span>Shipping</span><b>{{ shipping === 0 ? 'Complimentary' : money(shipping) }}</b>
    </div>
    <div v-if="discount">
      <span>Demo discount (10%)</span><b>−{{ money(discount) }}</b>
    </div>
    <form @submit.prevent="applyCoupon">
      <label for="coupon">Have a demo code?</label>
      <div class="coupon">
        <input id="coupon" v-model="couponInput" placeholder="Try DEMO10" /><button>Apply</button>
      </div>
      <p role="status" :class="{ error: couponError }">{{ couponMessage }}</p>
    </form>
    <div class="summary-total">
      <span>Total <small>USD</small></span
      ><b>{{ money(total) }}</b>
    </div>
    <button class="dark-button" @click="createOrder">Create demo order →</button>
    <p class="summary-note">Local simulation · no charge or real purchase</p>
  </aside>
</template>
