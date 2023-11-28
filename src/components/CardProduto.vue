<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
                <img :src="`src/assets/imagens/imagem${item.codigo}.png`" :alt="item.descricao">
            </figure>
        </div>
        <div class="card-content">
                <p class="title is-5" style="height: 50px;">{{ item.descricao }}</p>

            <div class="content">
                R$ {{ item.preco }},00
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "CardProduto",
    props: ['item']
})
</script>

<style scoped>
    @media screen and (min-width:1024px){
        .card{
            cursor: pointer;
        }
    }
</style>