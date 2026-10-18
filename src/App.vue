<script setup>
import { useWorkspace } from './composables/useWorkspace'
import { RouterView } from 'vue-router'
import OrderDetailsDialog from './components/OrderDetailsDialog.vue'
import { useRouteSync } from './composables/useRouteSync'
useRouteSync()
const { notice, orderDetail, go, cartCount, screen, browseCategory, openBag } = useWorkspace()
</script>
<template>
  <div class="announcement">
    THOUGHTFUL FINDS FOR EVERYDAY LIVING
    <span>INDEPENDENTLY REBUILT DEMO · FICTIONAL PRODUCTS</span>
  </div>
  <header>
    <button class="logo" @click="go('shop')">
      field <i>&</i> form<span>THE EVERYDAY EDIT</span>
    </button>
    <nav>
      <button :class="{ active: screen === 'shop' }" @click="go('shop')">Shop the collection</button
      ><button @click="browseCategory('Clothing')">Clothing</button
      ><button @click="browseCategory('Home')">Home & living</button>
    </nav>
    <div class="header-actions">
      <button :class="{ active: screen === 'orders' }" @click="go('orders')">My orders</button
      ><button class="bag" @click="go('cart')">
        Bag <b>{{ cartCount }}</b>
      </button>
    </div>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <div class="footer-logo">field <i>&</i> form</div>
    <p>
      An independent storefront reconstruction. All brands, products, prices and orders are
      fictional.
    </p>
    <span>Vue 3 · Vite · Responsive storefront · Local interactions</span>
  </footer>
  <div v-if="notice" class="toast" role="status">
    {{ notice }}<button v-if="notice.includes('Added')" @click="openBag">View bag →</button>
  </div>
  <OrderDetailsDialog v-if="orderDetail" />
</template>
