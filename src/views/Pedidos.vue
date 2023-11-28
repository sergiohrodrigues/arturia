<template>
    <section style="width: 90%; margin: 0 auto;">

        <h1 style="margin: 1rem 0; font-size: 1.5rem;">Pedidos</h1>
        <div class="box" v-if="pedidos.length > 0">
            <article class="media" v-for="ped in pedidos" :key="ped.id"
                style="display: flex; align-items: center; justify-content: space-around;">
                <p class="tamanho">
                    Id:
                    <span>
                        {{ ped.id }}
                    </span>
                </p>
                <p class="tamanho">
                    Data:
                    <span>
                        {{ ped.data }}
                    </span>
                </p>
                <p class="tamanho">
                    Valor:
                    <span>
                        R${{ ped.valorTotal }},00
                    </span>
                </p>
            </article>
        </div>
        <h2 v-else>Sem pedidos no momento</h2>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ViewPedidos',
    data() {
        return {
            pedidos: []
        }
    },
    mounted() {
        this.pedidos = JSON.parse(sessionStorage.getItem('pedidos'))
    }
})
</script>

<style scoped>
.tamanho {
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media screen and (min-width: 768px){
    .tamanho{
        font-size: 1.3rem;
        flex-direction: row;
        gap: 1rem;
    }
}
</style>