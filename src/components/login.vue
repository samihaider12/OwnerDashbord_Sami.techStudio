<template>
  <div class="container " id="login" :class="'theme-' + theme">
    <!-- Login Form -->
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card shadow p-4"> 
          <h3 class="text-center mb-4">Login Form</h3>
          <form @submit.prevent="handleSubmit" id="myForm">

            <!-- Email -->
            <div class="floating-label">
              <input v-model="email" type="email" @blur="emailValidation"
                     id="email" required>
              <label for="email">Email</label>
              <p v-if="emailErrors" class="text-danger"><small>{{ emailErrors }}</small></p>
            </div>

            <!-- Password -->
            <div class="floating-label">
              <input :type="showPassword ? 'text' : 'password'"
                     v-model="password" @blur="passwordValidation"
                     id="password" required>
              <label for="password">Password</label>
              <button type="button" class="toggle-btn" @click="togglePassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
              <p v-if="passwordErrors" class="text-danger"><small>{{ passwordErrors }}</small></p>
            </div>

            <!-- Submit -->
            <div class="d-grid mt-4">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isLoading ? 'Loing...' : 'Login' }}
                  </button>
            </div>
                 <p class="text-center mt-2">Don't have an account? 
                  <router-link to="/signup">Register</router-link>
                 </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed} from "vue";
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
const isLoading= ref(false)
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
    isLoading.value=true;
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
  finally{
    isLoading.value=false;
  }
}

</script>

<style scoped>
.row{
   background-color: white;
}
#login{
  margin-top: 80px;
}
.floating-label {
  position: relative;
  margin-bottom: 1.5rem;
}
.floating-label input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  outline: none;
  font-size: 1rem;
}
.floating-label label {
  position: absolute;
  left: 12px;
  top: 10px;
  background: white;
  padding: 0 4px;
  color: #6c757d;
  transition: 0.3s ease all;
}
.floating-label input:focus + label,
.floating-label input:not(:placeholder-shown) + label {
  top: -10px;
  font-size: 0.85rem;
  color: #007bff;
}
.toggle-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  cursor: pointer;
  color: #007bff;
}
</style>
