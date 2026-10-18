<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import BagSummary from '../components/BagSummary.vue'
const {
  cart,
  money,
  art,
  findProduct,
  available,
  go,
  openProduct,
  removeLine,
  cartCount,
  changeQuantity,
} = useWorkspace()
</script>
<template>
  <section class="page-title">
    <div class="eyebrow">YOUR EVERYDAY FINDS</div>
    <h1>
      The shopping bag<span>({{ cartCount }})</span>
    </h1>
    <p>A few good things, thoughtfully chosen.</p>
  </section>
  <div v-if="cart.length" class="cart-layout">
    <section>
      <div class="cart-head"><span>PRODUCT</span><span>QUANTITY</span><span>TOTAL</span></div>
      <article class="cart-line" v-for="(line, i) in cart" :key="line.key">
        <button class="cart-image" @click="openProduct(findProduct(line.id))">
          <img :src="art(findProduct(line.id))" :alt="findProduct(line.id).name" />
        </button>
        <div class="cart-product">
          <small>{{ findProduct(line.id).brand }}</small>
          <h3>{{ findProduct(line.id).name }}</h3>
          <p>{{ line.color }} / {{ line.size }}</p>
          <button @click="removeLine(i)">Remove</button>
        </div>
        <div class="quantity">
          <button
            :disabled="line.qty === 1"
            @click="changeQuantity(line.key, -1)"
            :aria-label="'Decrease ' + findProduct(line.id).name"
          >
            −</button
          ><span>{{ line.qty }}</span
          ><button
            :disabled="line.qty >= available(line.id, line.color, line.size)"
            @click="changeQuantity(line.key, 1)"
            :aria-label="'Increase ' + findProduct(line.id).name"
          >
            ＋
          </button>
        </div>
        <b class="line-total">{{ money(findProduct(line.id).price * line.qty) }}</b>
      </article>
      <button class="text-link" @click="go('shop')">← Continue exploring</button>
      <div class="local-disclosure">
        DEMO CHECKOUT
        <p>
          No payment, address or personal information is collected. Creating a demo order only
          updates this browser session.
        </p>
      </div>
    </section>
    <BagSummary />
  </div>
  <div v-else class="empty">
    <h2>A little room for something lovely.</h2>
    <p>Your bag is empty. Explore the collection to add a piece.</p>
    <button class="dark-button" @click="go('shop')">Explore the collection</button>
  </div>
</template>
