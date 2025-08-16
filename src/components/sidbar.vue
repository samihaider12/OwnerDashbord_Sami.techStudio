<template>
    <v-card id="card" :class="'theme-' + theme">
    <!-- Navbar for mobile & desktop -->
    <v-app-bar app color="primary" dark>
      <div >
        <v-app-bar-nav-icon @click="drawer = !drawer"
             class="d-flex d-md-none"
      ></v-app-bar-nav-icon>
      </div>
      <v-toolbar-title>Owner.Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Navbar links for desktop -->
      <v-btn
        v-for="link in navLinks"
        :key="link.title"
        :to="link.to"
        text
        class="d-none d-md-flex"
      >
        <v-icon left>{{ link.icon }}</v-icon> {{ link.title }}
      </v-btn>

      <!-- Logout -->
      <v-btn
        v-if="isLoggedIn"
        icon
        color="red"
        @click="logoutUser"
        class="d-none d-md-flex"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
         :class="'theme-' + theme"
      @click="rail = false"
    >
      <v-list density="compact" nav>
        <router-link
          v-for="link in navLinks"
          :key="link.title"
          :to="link.to"
          class="nav-link"
        >
          <v-list-item>
            <template v-slot:prepend>
              <v-icon color="#00BCD4">{{ link.icon }}</v-icon>
            </template>
            <v-list-item-title class="nav-text">{{ link.title }}</v-list-item-title>
          </v-list-item>
        </router-link>

        <v-list-item v-if="isLoggedIn">
          <template v-slot:prepend>
            <v-icon color="red">mdi-logout</v-icon>
          </template>
          <v-list-item-title @click="logoutUser" style="cursor:pointer;">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
   
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const router = useRouter();
const isLoggedIn = ref(false);
const drawer = ref(false);
const rail = ref(false);

import { computed} from "vue";
import { useStore } from "vuex";

const store = useStore();
const theme = computed(() => store.getters.currentTheme);



const navLinks = [
  { title: 'Dashboard', to: '/Dashbord', icon: 'mdi-view-dashboard' },
  { title: 'Users', to: '/User', icon: 'mdi-account-group' },
  { title: 'Charts', to: '/charts', icon: 'mdi-chart-line' },
  { title: 'Settings', to: '/Setting', icon: 'mdi-cog' },
];

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = !!user;
  });
});

function logoutUser() {
  signOut(auth).then(() => {
    router.push('/login');
  });
}
</script>

<style scoped>
#card {
  z-index: 1000;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .nav-text {
    font-size: 14px;
  }
}
</style>
















