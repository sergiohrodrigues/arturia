<template>
    <div class="notificacoes">
        <article class="message" :class="contexto[notificacao.tipo]" v-for="notificacao in notificacoes"
            :key="notificacao.id">
            <div class="message-header">{{ notificacao.titulo }}</div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>
    
<script lang="ts">
import { computed, defineComponent } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/stores/store";

export default defineComponent({
    name: "AlertaNotificacoes",
    data() {
        return {
            contexto: {
                [TipoNotificacao.SUCESSO]: 'is-success',
                [TipoNotificacao.ATENCAO]: 'is-warning',
                [TipoNotificacao.FALHA]: 'is-danger',
            }
        }
    },
    setup() {
        const store = useStore();
        return {
            notificacoes: computed(() => store.notificacoes),
        };
    },
});
</script>
    
<style scoped>
.notificacoes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10000;
}

@media screen and (min-width: 768px) {
    .notificacoes {
        left: 50%;
        width: 400px;
        margin: 0 auto;
        transform: translate(-50%);
    }
}
</style>