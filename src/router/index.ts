import { createRouter, createWebHistory } from 'vue-router'
import Produtos from '@/views/Produtos.vue'
import Pedidos from '../views/Pedidos.vue'
import Carrinho from '../views/Carrinho.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'produtos',
      component: Produtos
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: Pedidos
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: Carrinho
    }
  ]
})

export default router
