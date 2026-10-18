import { afterEach, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from './App.vue'
import { router as applicationRouter } from './router'
import { useStorefrontStore } from './stores/storefront'

let wrapper
afterEach(() => wrapper?.unmount())

it('loads a product URL and creates an order through the bag component', async () => {
  const pinia = createPinia()
  const router = createRouter({
    history: createMemoryHistory(),
    routes: applicationRouter.options.routes,
  })
  await router.push('/products/3')
  wrapper = mount(App, { attachTo: document.body, global: { plugins: [pinia, router] } })
  await flushPromises()
  expect(wrapper.find('h1').text()).toBe('Canvas market tote')
  const bag = wrapper.findAll('header button').find((button) => button.text().includes('Bag'))
  await bag.trigger('click')
  await flushPromises()
  await vi.waitFor(() => expect(router.currentRoute.value.path).toBe('/bag'))
  await wrapper.get('#coupon').setValue('DEMO10')
  await wrapper.get('.summary form').trigger('submit')
  expect(wrapper.get('.summary-total').text()).toContain('$93.60')
  const createOrder = wrapper
    .findAll('button')
    .find((button) => button.text().includes('Create demo order'))
  await createOrder.trigger('click')
  await flushPromises()
  await vi.waitFor(() => expect(router.currentRoute.value.path).toBe('/orders'))
  expect(useStorefrontStore(pinia).cartCount).toBe(0)
  expect(wrapper.text()).toContain('DEMO-2026-1004')
  expect(wrapper.text()).toContain('$93.60')
  await router.push('/products/999999')
  await flushPromises()
  expect(router.currentRoute.value.path).toBe('/')
})
