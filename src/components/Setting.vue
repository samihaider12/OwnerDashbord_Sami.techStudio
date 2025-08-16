<template >
<div :class="'theme-' + theme">
    <v-container class="pa-6" id="setting" >
    <h1 class="mb-6 font-weight-bold">Settings</h1>

    <section >        
    <v-row >
      <!-- Theme Preference -->
      <v-col
       cols="12" md="4" >
        <v-card class="pa-4" rounded="xl" >
          <v-switch
            :value="theme === 'dark'"
            :label="theme === 'light' ? 'Dark Mode' : 'Light Mode'"
            :prepend-icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
            inset
            @click="toggleTheme"
          />
        </v-card>
      </v-col>

      <!-- Profile Info -->
      <v-col cols="12" md="8">
        <v-card class="pa-4" rounded="xl">
          
          <v-text-field v-model="fullName" label="Full Name" prepend-inner-icon="mdi-account" variant="outlined" class="mb-4"></v-text-field>
          <v-text-field v-model="email" label="Email" prepend-inner-icon="mdi-email" variant="outlined" class="mb-4"></v-text-field>

          <v-select v-model="role" :items="['Admin', 'User', 'Manager']" label="Role" prepend-inner-icon="mdi-account-badge" variant="outlined" class="mb-4"></v-select>

          <v-switch v-model="changePassword" label="Change Password?" inset class="mb-2"></v-switch>
          <v-text-field v-if="changePassword" v-model="password" label="New Password" type="password" prepend-inner-icon="mdi-lock" variant="outlined" class="mb-4"></v-text-field>

          <div class="d-flex justify-space-between">
            <v-btn color="red" variant="tonal" @click="openDeleteDialog">Delete Account</v-btn>
            <v-btn color="primary" @click="saveChanges">Save Changes</v-btn>
          </div>

          <p v-if="lastUpdated" class="text-caption mt-3">
            Last updated on: {{ lastUpdated }}
          </p>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog   max-width="400">
      <v-card>
        <!-- <v-card-title>Confirm Delete</v-card-title> -->
        <v-card-text>Are you sure you want to delete your account? This action cannot be undone.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="outlined" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red" @click="confirmDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </section>
  </v-container>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

const store = useStore();

// Vuex getter se theme le rahe hain
const theme = computed(() => store.getters.currentTheme);

// Toggle theme function
const toggleTheme = () => {
  store.commit("toggleTheme");
};

// Profile data
const profilePic = ref(null);
const defaultPic = "https://via.placeholder.com/100";
const fullName = ref("Sami Haider");
const email = ref("samihaider687@email.com");
const role = ref("Admin");
const changePassword = ref(false);
const password = ref("");
const lastUpdated = ref("");

// Profile pic upload
const handlePicUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    profilePic.value = URL.createObjectURL(file);
  }
};

// Save changes with SweetAlert
const saveChanges = () => {
  lastUpdated.value = new Date().toLocaleString();

  Swal.fire({
    icon: "success",
    title: "Changes Saved!",
    text: "Your profile settings have been updated.",
    timer: 2000,
    showConfirmButton: false,
  });
};

// Delete confirmation with SweetAlert
const openDeleteDialog = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your account has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  });
};
</script>

<style scoped>
#setting {
  margin-top: 80px;
  min-height: 89vh;
}
.v-card {
  transition: background-color 0.3s ease;
}

 

</style>
