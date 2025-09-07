<template>
  <div class="container " id="login" :class="'theme-' + theme">
    <!-- Login Form -->
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card shadow p-4">

          <v-card class="pa-6" max-width="400">
            <h3 class="text-center mb-6">Login Form</h3>

            <v-form @submit.prevent="handleSubmit" id="myForm">
              <!-- Email -->
              <v-text-field v-model="email" label="Email" type="email" variant="outlined" clearable
                @blur="emailValidation" :error-messages="emailErrors" class="mb-3" required></v-text-field>

              <!-- Password -->
              <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password"
                variant="outlined"  @blur="passwordValidation"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="togglePassword"
                :error-messages="passwordErrors" class="mb-3" required></v-text-field>

              <!-- Submit -->
              <v-btn type="submit" color="primary" block :loading="isLoading" class="mt-4">
                {{ isLoading ? 'Logging in...' : 'Login' }}
              </v-btn>

              <!-- Link -->
              <p class="text-center mt-4">
                Don’t have an account?
                <router-link to="/signup">Register</router-link>
              </p>
            </v-form>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const stor = useStore();
const theme = computed(() => stor.getters.currentTheme);


import Swal from 'sweetalert2';
import { ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDFATaCm2sHZ43l5p248ruNqe9NpHMzcRw",
  authDomain: "authentication-app-832db.firebaseapp.com",
  databaseURL: "https://authentication-app-832db-default-rtdb.firebaseio.com",
  projectId: "authentication-app-832db",
  storageBucket: "authentication-app-832db.appspot.com",
  messagingSenderId: "1099249970529",
  appId: "1:1099249970529:web:971c227b957ad23fc22920"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// email
const email = ref('');
const emailErrors = ref('');
// password
const password = ref('');
const passwordErrors = ref('');
const showPassword = ref(false);
// isLoading
const isLoading = ref(false)
// Show & Hide Password
function togglePassword() {
  showPassword.value = !showPassword.value;
}

// E-mail Validation
function emailValidation() {
  if (!email.value) {
    emailErrors.value = "";
    return;
  }
  const checkSpecial = (email.value.match(/[@]/g) || []).length;

  let emailError = [];

  if (checkSpecial < 1) emailError.push("Must contain @");
  emailErrors.value = emailError.join(" , ");
}

// Password Validation
function passwordValidation() {
  if (!password.value) {
    passwordErrors.value = "";
    return;
  }
}

// Use router
let store = useRouter();

// Submit
async function handleSubmit() {
  emailValidation();
  passwordValidation();

  if (emailErrors.value || passwordErrors.value) {
    return;
  }

  try {
    isLoading.value = true;
    // Login user in Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const userData = userCredential.user;

    Swal.fire({
      title: 'Login Successful!',
      text: 'Welcome back!',
      icon: 'success',
      confirmButtonText: 'Go to Dashboard'
    }).then(() => {
      store.push('/Dashbord');
    });

    document.getElementById('myForm').reset();

  } catch (error) {
    Swal.fire({
      title: 'Login Failed',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  finally {
    isLoading.value = false;
  }
}

</script>

<style scoped>
.row {
  background-color: white;
}

#login {
  margin-top: 130px;
}
 
</style>
