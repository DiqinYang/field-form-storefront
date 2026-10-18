import knit from '../assets/art/knit.svg'
import overshirt from '../assets/art/overshirt.svg'
import tote from '../assets/art/tote.svg'
import mug from '../assets/art/mug.svg'
import cardigan from '../assets/art/cardigan.svg'
import trousers from '../assets/art/trousers.svg'
const illustrations = { knit, overshirt, tote, mug, cardigan, trousers }
export function available(id, color, size) {
  return id === 1 && color === 'Charcoal' && size === 'L' ? 0 : size === 'L' ? 3 : 8
}
export const money = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
export const art = (product) => illustrations[product.art]
export const swatch = (c) =>
  ({
    Oat: '#c8bea8',
    Charcoal: '#575750',
    Sage: '#a0aa95',
    Sand: '#c1b59e',
    Natural: '#d3c1a1',
    Clay: '#b29c7e',
    Cream: '#e4dcc7',
    Terracotta: '#aa806c',
  })[c]
export const statusText = (s) =>
  ({
    Processing: 'Preparing your fictional order.',
    Shipped: 'Illustrative shipping status — no live tracking.',
    Delivered: 'A completed example order.',
    Cancelled: 'Cancelled within this local demo.',
  })[s]
export const stage = (s) => ['Processing', 'Shipped', 'Delivered'].indexOf(s)
