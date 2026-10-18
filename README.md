# Field & Form — Storefront, Bag & Orders

A complete Vue 3 + Vite application with Vue Router, Pinia, Vue SFCs and fictional fixtures. ProductCard.vue, BagSummary.vue and OrderDetailsDialog.vue separate catalogue, totals and order UI. The Pinia store owns inventory checks and order snapshots.

## Run

Use Node.js 24 and npm. This repository is self-contained; no sibling project or workspace root is required.

```sh
git clone https://github.com/DiqinYang/field-form-storefront.git
cd field-form-storefront
npm ci --ignore-scripts
npm run dev
```

```sh
npm test
npm run format:check
npm run build
npm run preview
```

Vite prints the localhost URL. Production output is generated into the ignored dist/ directory. Dependencies are pinned by this repository's own package-lock.json.

## Routes and features

- `/`: collection, label/category/price filters, search and sorting.
- `/products/:id`: original product artwork, colours, sizes, quantities and stock feedback.
- `/bag`: variant lines, quantity bounds, DEMO10 coupon and totals.
- `/orders`: status filters, order detail timeline and local cancellation.

## Try the workflow

1. Open the everyday knit and choose Charcoal / L to see an unavailable variant.
2. In the seeded bag, apply DEMO10: $104 subtotal, $10.40 discount, free shipping, $93.60 total.
3. Create a demo order; the bag clears and order history shows a Processing record.
4. View its details, cancel with confirmation and filter Cancelled orders.
5. For a single $68 knit, shipping is $5 and DEMO10 produces $66.20 total.

## Source map

- `src/router/`: route definitions and lazy-loaded pages.
- `src/views/`: page components.
- `src/components/`: reusable domain UI.
- `src/composables/`: view adapters, navigation and lifecycle effects.
- `src/stores/`: shared state, derived values, actions and business tests.
- `src/data/`: fictional starting records.
- `src/assets/`: CSS and any original illustrations.

Run `npm test` from this repository root for business tests. See [architecture](ARCHITECTURE.md) for design decisions and [screenshots](screenshots/) for visual examples.

## Scope and privacy

All data is synthetic and stays in memory. Reloading restores the starting data. No client API, authentication, real publication, payment or customer data is included. This is an independent reconstruction of interface patterns, not the original production repository or complete original business logic. The production HTML CSP blocks outgoing connections; Vite development uses its local hot-update connection.

Stock limits are illustrative: placing a demo order does not decrement an inventory ledger. Product artwork does not recolour when choosing a variant. Shipping is free at a pre-discount subtotal of $100 or more, otherwise $5; no tax calculation is modelled.

## Review and licenses

Read [architecture](ARCHITECTURE.md) for state ownership and component boundaries, and [privacy review](PRIVACY.md) for the publication boundary. Third-party licenses are in licenses/. No blanket open-source license is granted to the original demo application code.
