<script setup>
import { useWorkspace } from '../composables/useWorkspace'
import ProductCard from '../components/ProductCard.vue'
import toteArt from '../assets/art/tote.svg'
const {
  category,
  categories,
  brand,
  brands,
  search,
  sort,
  priceRange,
  browse,
  resetFilters,
  filtered,
} = useWorkspace()
</script>
<template>
  <section class="hero">
    <div class="hero-copy">
      <div class="eyebrow">A CONSIDERED COLLECTION / AUTUMN 2026</div>
      <h1>Less, but<br />a little lovelier.</h1>
      <p>Everyday pieces. Independent labels.<br />Made for the moments in between.</p>
      <button class="dark-button" @click="browse">Explore the collection &nbsp; ↗</button>
      <div class="hero-bottom">01 — THE SLOW LIVING EDIT <span>FIELD & FORM</span></div>
    </div>
    <div class="hero-art">
      <img :src="toteArt" alt="Original illustration of a canvas tote" />
      <div class="hero-caption">
        A companion for the everyday.<span>Field Studio · Canvas market tote</span>
      </div>
    </div>
  </section>
  <section class="collection" id="collection">
    <div class="section-heading">
      <div>
        <div class="eyebrow">DISCOVER YOUR NEXT EVERYDAY FAVOURITE</div>
        <h2>The considered collection</h2>
      </div>
      <span>{{ filtered.length }} thoughtful finds</span>
    </div>
    <div class="filters">
      <div class="category-tabs">
        <button v-for="c in categories" :class="{ selected: category === c }" @click="category = c">
          {{ c }}
        </button>
      </div>
      <div class="filter-controls">
        <label class="sr-only" for="search">Search products</label
        ><input id="search" v-model="search" placeholder="Search products…" /><label
          class="sr-only"
          for="brand"
          >Brand</label
        ><select id="brand" v-model="brand">
          <option>All labels</option>
          <option v-for="b in brands">{{ b }}</option></select
        ><label class="sr-only" for="priceRange">Price range</label
        ><select id="priceRange" v-model="priceRange">
          <option value="all">All prices</option>
          <option value="under50">Under $50</option>
          <option value="50to75">$50–$75</option>
          <option value="over75">Over $75</option></select
        ><label class="sr-only" for="sort">Sort products</label
        ><select id="sort" v-model="sort">
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>
    </div>
    <div class="products"><ProductCard v-for="p in filtered" :key="p.id" :p="p" /></div>
    <div v-if="!filtered.length" class="empty">
      <h2>No pieces found.</h2>
      <p>Try another label, category or search.</p>
      <button class="dark-button" @click="resetFilters">Clear filters</button>
    </div>
  </section>
</template>
