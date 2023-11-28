<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <Notificacoes />
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img src="../assets/logo.png">
            </router-link>

            <a role="button" class="navbar-burger" :class="menuAberto" aria-label="menu" aria-expanded="false"
                data-target="navbarBasicExample" @click="abrirMenu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu" :class="menuAberto">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item" @click="menuOpen = false">
                    Produtos
                </router-link>
                <router-link to="/pedidos" class="navbar-item" @click="menuOpen = false">
                    Meus Pedidos
                </router-link>
            </div>

            <div class="navbar-end segundoMenu">
                <router-link to="/carrinho" @click="menuOpen = false">
                    <i class="fa-solid fa-cart-shopping" ></i>
                </router-link>
                <div class="dropdown" :class="menuUsuarioAberto">
                    <div class="dropdown-trigger" @click="abrirMenuUsuario">
                        <div class="circle-button">
                            <img src="../assets/wiiliam.jpg" alt="Descrição da imagem" class="circle-image" />
                        </div>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu" style="margin-right: 5rem;">
                        <div class="dropdown-content">
                            <span href="#" class="dropdown-item">
                                {{ usuario }}
                            </span>
                            <a class="dropdown-item">
                                Minha Conta
                            </a>
                            <a href="#" class="dropdown-item">
                                Sair
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notificacoes from './Notificacoes.vue';
import { inicializarBancoDeDados } from '@/bancoDeDados/indexedDBService';

export default defineComponent({
    name: 'ComponenteMenu',
    data() {
        return {
            usuario: '',
            menuOpen: false,
            menuUsuario: false
        };
    },
    methods: {
        abrirMenu() {
            this.menuOpen = !this.menuOpen;
        },
        abrirMenuUsuario() {
            this.menuUsuario = !this.menuUsuario;
        }
    },
    computed: {
        menuAberto() {
            return this.menuOpen ? 'is-active' : '';
        },
        menuUsuarioAberto() {
            return this.menuUsuario ? 'is-active' : '';
        }
    },
    components: { Notificacoes },
    async mounted() {
        const db = await inicializarBancoDeDados();
        const itens = await db.getAll('usuario');
        this.usuario = itens[0].usuario;
        console.log('Itens carregados com sucesso!');
    },
})
</script>

<style>
.segundoMenu {
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding-left: 0.5rem;
}

.fa-solid {
    font-size: 1.5rem;
    padding: 1rem 0.5rem;
}

.circle-button {
    width: 50px;
    height: 50px;
    /* Cor de fundo do botão */
    border-radius: 50%;
    /* Torna o botão circular */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.circle-image {
    width: 80%;
    /* Ajuste a largura conforme necessário */
    height: 80%;
    /* Ajuste a altura conforme necessário */
    border-radius: 50%;
    /* Torna a imagem redonda */
    object-fit: cover;
    /* Mantém a proporção da imagem ao cobrir a área da imagem */
}

@media screen and (min-width: 768px) {
    .fa-solid {
        cursor: pointer;
        padding: 0 2rem;
    }

    .segundoMenu {
        flex-direction: row;
        align-items: center;
        padding: 0;
        margin-right: 5rem;
    }
}
</style>