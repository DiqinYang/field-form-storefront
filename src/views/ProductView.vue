<script setup>
import { useWorkspace } from '../composables/useWorkspace'

const { color, size, qty, zoom, money, art, swatch, go, addToCart, product, stock, cartCount } =
  useWorkspace()
</script>
<template>
  <div class="breadcrumb">
    <button @click="go('shop')">Collection</button> / {{ product.category }} / {{ product.name }}
  </div>
  <section class="product-detail">
    <div class="gallery">
      <div class="main-image" :class="{ closeup: zoom }">
        <img :src="art(product)" :alt="product.name + ' original product illustration'" /><span>{{
          zoom ? 'DETAIL VIEW' : 'ORIGINAL DEMO ILLUSTRATION'
        }}</span>
      </div>
      <div class="thumbs">
        <button @click="zoom = false" :class="{ selected: !zoom }">
          <img :src="art(product)" alt="Full product view" /></button
        ><button @click="zoom = true" :class="{ selected: zoom }" class="zoom-thumb">
          <img :src="art(product)" alt="Close-up product view" />
        </button>
        <p>Illustrated for this demo.<br />All products and labels are fictional.</p>
      </div>
    </div>
    <div class="product-info">
      <div class="eyebrow">{{ product.brand }} / THE EVERYDAY COLLECTION</div>
      <h1>{{ product.name }}</h1>
      <div class="price">{{ money(product.price) }} <small>USD</small></div>
      <p class="product-description">{{ product.description }}</p>
      <div class="variant-label">
        Colour <b>{{ color }}</b>
      </div>
      <div class="swatches">
        <button
          v-for="c in product.colors"
          :style="{ background: swatch(c) }"
          :class="{ selected: color === c }"
          :aria-label="'Select ' + c"
          :aria-pressed="color === c"
          @click="color = c"
        ></button>
      </div>
      <div class="variant-label">
        {{ product.sizes.length === 1 ? 'Option' : 'Size' }} <b>{{ size }}</b>
      </div>
      <div class="sizes">
        <button
          v-for="s in product.sizes"
          :class="{ selected: size === s }"
          :aria-pressed="size === s"
          @click="size = s"
        >
          {{ s }}
        </button>
      </div>
      <div class="stock">
        <i :class="{ soldout: stock === 0 }"></i
        >{{
          stock === 0
            ? 'This variant is out of stock'
            : stock + ' available in this fictional inventory'
        }}
      </div>
      <div class="add-row">
        <div class="quantity">
          <button :disabled="qty <= 1" @click="qty--" aria-label="Decrease product quantity">
            −</button
          ><span>{{ qty }}</span
          ><button
            :disabled="qty >= Math.max(1, stock)"
            @click="qty++"
            aria-label="Increase product quantity"
          >
            ＋
          </button>
        </div>
        <button class="dark-button" :disabled="stock === 0" @click="addToCart">
          {{ stock === 0 ? 'Out of stock' : 'Add to bag — ' + money(product.price * qty) }}
        </button>
      </div>
      <div class="service-lines">
        <span>↗ Free demo shipping on subtotals $100+</span
        ><span>◇ A fictional collection, made for demonstration</span>
      </div>
      <details open>
        <summary>Details & materials</summary>
        <p>
          {{ product.material }}. Product information is illustrative and does not describe a real
          item.
        </p>
      </details>
      <details>
        <summary>Shipping & returns</summary>
        <p>
          Orders, shipping and fulfilment are simulated locally. No purchase or delivery occurs.
        </p>
      </details>
      <button class="text-link" @click="go('cart')">View shopping bag ({{ cartCount }}) →</button>
    </div>
  </section>
</template>
