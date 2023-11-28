<template>
    <div class="modal" :class="modalOpen">
        <div class="modal-background" @click="fecharModal"></div>
        <div class="modal-content">
            <div class="box">
                <img :src="`src/assets/imagens/imagem${item.codigo}.png`" :alt="item.descricao" class="imagem">
                <div class="conteudo">
                    <h2 style="font-size: 1.5rem;">
                        {{ item.descricao }}
                    </h2>
                    <span style="font-size: 1.3rem; font-weight: bold;">
                        R${{ item.preco }},00
                    </span>
                    <div class="botoes">
                        <button class="button is-success" @click="adicionarItemNoCarrinho(item)">Adicionar ao
                            Carrinho</button>
                        <button class="button" @click="fecharModal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="fecharModal"></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type Item from '@/interfaces/Item';
import Notificador from '@/utils/Notificador';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/stores/store';

export default defineComponent({
    name: 'ModalProduto',
    props: ['abrirModal', 'item'],
    emits: ['fecharModal'],
    computed: {
        modalOpen() {
            return this.abrirModal ? 'is-active' : ''
        }
    },
    methods: {
        fecharModal() {
            this.$emit('fecharModal', true)
        },
        adicionarItemNoCarrinho(item: Item) {

            const itemJaExistente = this.store.carrinho.some(it => it.codigo === item.codigo);

            if (!itemJaExistente) {
                this.store.adicionarCarrinho(item);

                const listaCarrinho = JSON.parse(sessionStorage.getItem('carrinho') || '[]') as Item[];
                listaCarrinho.push(item);
                sessionStorage.setItem('carrinho', JSON.stringify(listaCarrinho));

                this.$emit('fecharModal', true);

                this.notificar(TipoNotificacao.SUCESSO, 'Sucesso', 'Produto Adicionado ao carrinho!');
            } else {

                this.notificar(TipoNotificacao.FALHA, 'Erro', 'Produto já adicionado no carrinho!');

                this.$emit('fecharModal', true);

            }
        }
    },
    mounted() {

    },
    setup() {
        const { notificar } = Notificador()
        const store = useStore();

        return {
            notificar,
            store
        }
    }
})
</script>

<style scoped>
.imagem {
    max-width: 250px;
    max-height: 200px;
}

.box {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    justify-content: space-around;
}

.conteudo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.botoes {
    display: flex;
    gap: 1rem;
}

@media screen and (min-width: 1024px) {
    .box {
        flex-direction: row;
        gap: 2rem;
        height: 300px;
    }

    .conteudo {
        justify-content: space-around;
    }
}
</style>