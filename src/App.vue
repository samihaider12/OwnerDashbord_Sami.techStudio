<script setup>
import sidbar from './components/sidbar.vue';
import Footer from './components/Footer.vue';
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const theme = computed(() => store.getters.currentTheme) //:class="'theme-' + theme"
</script>

<template>
 
    <v-app >
      <sidbar :class="'theme-' + theme"/>
      <router-view :class="'theme-' + theme"/>
     
   </v-app>
  <Footer :class="'theme-' + theme"/>
 
</template>

<style scoped>

</style>
