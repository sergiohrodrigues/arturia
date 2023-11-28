<template>
    <ul class="lista">
        <li v-for="product in products" :key="product.codigo" class="item">
            <CardProduto :item="product" @click="selecionarItem(product)" />
        </li>
    </ul>
    <ModalProduto v-if="itemSelecionado !== null" :abrirModal="abrirModal" @fecharModal="fecharModal"
        :item="itemSelecionado" />
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { inicializarBancoDeDados } from '../bancoDeDados/indexedDBService';
import CardProduto from '@/components/CardProduto.vue';
import ModalProduto from '@/components/ModalProduto.vue';
import type Item from '../interfaces/Item';
import { useStore } from '@/stores/store';

export default defineComponent({
    name: "ProdutosC",
    data() {
        return {
            products: [] as any[],
            itemSelecionado: null as Item | null,
            abrirModal: false,
            lista: [] as Item[],
        };
    },
    methods: {
        selecionarItem(product: any) {
            this.itemSelecionado = product
            this.abrirModal = true;
        },
        fecharModal(ok: boolean) {
            this.abrirModal = !ok
        }
    },
    async mounted() {
        const db = await inicializarBancoDeDados();
        const itens = await db.getAll('itens');
        this.products = itens;
        console.log('Itens carregados com sucesso!');

        const listaSalva = sessionStorage.getItem('carrinho');
        this.lista = listaSalva ? JSON.parse(listaSalva) : [];

        this.lista.forEach((item) => {
            if (!this.store.carrinho.some((carrinhoItem) => carrinhoItem.codigo === item.codigo)) {
                this.store.adicionarCarrinho(item);
            }
        });
    },
    setup() {
        const store = useStore()

        return {
            store
        }
    },
    components: { CardProduto, ModalProduto }
});
</script>

<style scoped>
.lista {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 2rem 2rem;
}

.item {
    width: 100%;
    max-width: 200px;
    height: 300px;
}

@media screen and (min-width: 1024px) {
    .lista {
        justify-content: left;
    }
}
</style>