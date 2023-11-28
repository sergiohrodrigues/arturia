<template>
    <h2 style="font-size: 1.5rem; margin: 1rem 0 1rem 1rem; text-align: center;">Carrinho</h2>
    <h2 style="font-size: 1.5rem; margin: 1rem 0 1rem 1rem; text-align: center;" v-if="lista.length == 0">{{ subtitulo }}</h2>
    <div class="box" v-else>
        <article class="media" v-for="item in lista" :key="item.codigo"
        style="display: flex; align-items: center; margin: 1rem 0;">
            <itemCarrinho :item="item" @item-removido="removerItem" />
        </article>
        <h2 style="text-align: right; font-size: 1.5rem;">Valor total: <span style="font-weight: bold;">R${{ valorTotal }},00</span></h2>
    </div>
    <div style="width: 100%; max-width: 100px; margin: 0 auto;" v-if="subtitulo === 'Pedido finalizado com sucesso!'">
        <button class="button is-info" style="margin: 0;" @click="$router.push('/pedidos')">Meus pedidos</button>
    </div>
    <div style="width: 100%; max-width: 700px; margin: 0 auto;">
        <button class="button is-success" @click="finalizarPedido" v-if="lista.length > 0">Finalizar Pedido</button>
    </div>
</template>

<script lang="ts">
import itemCarrinho from '@/components/itemCarrinho.vue';
import type Item from '@/interfaces/Item';
import { useStore } from '@/stores/store';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ViewCarrinho',
    data() {
        return {
            lista: [] as Item[],
            subtitulo: 'Sem itens no momento',
            total: 0
        };
    },
    methods: {
        removerItem(item: Item) {
            this.store.removerItemCarrinho(item);

            const listaAtualizada = this.lista.filter((it) => it.codigo !== item.codigo);
            this.lista = listaAtualizada
            sessionStorage.setItem('carrinho', JSON.stringify(listaAtualizada));

        },
        finalizarPedido() {
            const total = this.valorTotal
            this.lista = []
            this.subtitulo = 'Pedido finalizado com sucesso!'
            this.store.removerTodosItensDoCarrinho()
            sessionStorage.setItem('carrinho', JSON.stringify([]))

            const dataAtual = new Date();

            // Obtenha o dia, mês e ano da data
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1; // Adiciona 1 para ajustar o início do mês para 1 (janeiro é 0)
            const ano = dataAtual.getFullYear();

            const pedido = {
                id: Date.now().toString(5),
                data: `${dia}/${mes}/${ano}`,
                valorTotal: total
            }

            const listaPedidosSalva = sessionStorage.getItem('pedidos');
            const listaPedidos = listaPedidosSalva ? JSON.parse(listaPedidosSalva) : [];

            listaPedidos.push(pedido);

            // Salve a lista atualizada no sessionStorage
            sessionStorage.setItem('pedidos', JSON.stringify(listaPedidos));
        }
    },
    computed: {
        valorTotal() {
            return this.lista.reduce((total, item) => total + item.preco, 0);
        }
    },
    mounted() {
        const listaSalva = sessionStorage.getItem('carrinho');
        this.lista = listaSalva ? JSON.parse(listaSalva) : [];

        this.lista.forEach((item) => {
            if (!this.store.carrinho.some((carrinhoItem) => carrinhoItem.codigo === item.codigo)) {
                this.store.adicionarCarrinho(item);
            }
        });
    },
    setup() {
        const store = useStore();

        return {
            store,
        };
    },
    components: { itemCarrinho }
})
</script>

<style scoped>
.button {
    margin-left: 1rem;
}

@media screen and (min-width: 768px) {
    .box {
        margin: 0 auto;
        max-width: 700px;
    }

    .button {
        margin: 1rem 0;
    }
}
</style>