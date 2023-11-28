<template>
    <div class="media-left">
        <figure class="image is-64x64">
            <img :src="`src/assets/imagens/imagem${item.codigo}.png`" :alt="item.descricao">
        </figure>
    </div>
    <div class="media-content">
        <div class="content">
            <p style="width: 300px;">
                <strong>{{ item.descricao }}</strong>
            </p>
            <p>
                <strong>R${{ valorMultiplicado }},00</strong>
            </p>
            <i class="fa-solid fa-trash" @click="removerItemCarrinho"></i>
        </div>
    </div>
</template>

<script lang="ts">
import type Item from '@/interfaces/Item';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ItemCarrinho',
    props: ['item'],
    emits: ['itemRemovido'],
    data() {
        return {
            quantidade: 1
        }
    },
    methods: {
        aumentarQuantidade() {
            this.quantidade += 1;
        },
        diminuirQuantidade() {
            if (this.quantidade === 1) {
                return 1;
            }
            this.quantidade -= 1;
        },
        removerItemCarrinho() {
            const lista = JSON.parse(sessionStorage.getItem('carrinho') as string)

            const listaAtualizada: Item[] = lista.filter((it: Item) => it.codigo !== this.item.codigo)
            sessionStorage.setItem('carrinho', JSON.stringify(listaAtualizada))

            this.$emit('itemRemovido', this.item)
        }
    },
    computed: {
        valorMultiplicado() {
            return this.item.preco * this.quantidade
        }
    }
})
</script>

<style scoped>
    @media screen and (min-width: 768px){
        .content{
            display: flex;
            justify-content: space-around;
        }
    }
</style>