<script setup>
import { useWorkspace } from '../composables/useWorkspace'
defineProps({ p: { type: Object, required: true } })
const { money, art, openProduct } = useWorkspace()
</script>
<template>
  <button class="product-card" @click="openProduct(p)">
    <div class="product-image">
      <img :src="art(p)" :alt="p.name + ' — original illustration'" /><span>{{ p.tag }}</span
      ><b>View piece ↗</b>
    </div>
    <div class="product-meta">
      <div>
        <small>{{ p.brand }}</small>
        <h3>{{ p.name }}</h3>
        <p>{{ p.subtitle }}</p>
      </div>
      <span>{{ money(p.price) }}</span>
    </div>
  </button>
</template>
