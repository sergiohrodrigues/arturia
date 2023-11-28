<script setup lang="ts">
import Menu from './components/Menu.vue';
</script>

<template>
  <Menu />
  <RouterView />
</template>

<style>
  .main{
    min-width: 300px;
  }
</style>