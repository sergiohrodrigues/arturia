import { ref } from 'vue'
import { defineStore } from 'pinia'
import type Item from '@/interfaces/Item'
import type { INotificacao } from '@/interfaces/INotificacao'

export const useStore = defineStore('counter', () => {

  const carrinho = ref([] as Item[])
  const notificacoes = ref([] as INotificacao[])

  function adicionarCarrinho(item: Item) {
    carrinho.value.push(item)
  }

  function mostrarItensCarrinho() {
    return carrinho;
  }

  function removerItemCarrinho(item: Item){
    const listaAtualizada = carrinho.value.filter(it => it.codigo !== item.codigo)
    carrinho.value = listaAtualizada
  }

  function removerTodosItensDoCarrinho(){
    carrinho.value = []
  }

  function notificar(novaNotificacao: INotificacao) {

    if (notificacoes.value.length < 3) {
      novaNotificacao.id = new Date().getTime()
      notificacoes.value.push(novaNotificacao)

      setTimeout(() => {
        notificacoes.value = notificacoes.value.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000)
    }

  }

  return { carrinho, notificacoes, adicionarCarrinho, removerItemCarrinho, mostrarItensCarrinho, removerTodosItensDoCarrinho, notificar }
})
