<template>
  <div class="container  ">
    <!-- Signup Form -->
    <div class="row justify-content-center" style="background-color: white;">
      <div class="col-md-4">
        <div class="card shadow p-4">
          <v-card class="pa-6" max-width="400">
            <h3 class="text-center mb-6">Signup Form</h3>

            <v-form @submit.prevent="handleSubmit" id="myForm">
              <!-- Username -->
              <v-text-field v-model="userName" label="Username" variant="outlined" clearable @blur="userValidation"
                :error-messages="userErrors" class="mb-3" required></v-text-field>

              <!-- Email -->
              <v-text-field v-model="email" type="email" label="Email" variant="outlined" clearable
                @blur="emailValidation" :error-messages="emailErrors" class="mb-3" required></v-text-field>

              <!-- Password -->
              <v-text-field v-model="password" :type="showPassword ? 'text' : 'password'" label="Password"
                variant="outlined"   @blur="passwordValidation"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'" @click:append-inner="togglePassword"
                :error-messages="passwordErrors" class="mb-3" required></v-text-field>

              <!-- Submit -->
              <v-btn type="submit" color="primary" block :loading="isLoading" class="mt-4">
                {{ isLoading ? 'Submitting...' : 'Submit' }}
              </v-btn>

              <!-- Link -->
              <p class="text-center mt-4">
                Already have an account?
                <router-link to="/login">Login</router-link>
              </p>
            </v-form>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import Swal from 'sweetalert2';
import { ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

// userName
const userName = ref()
const userErrors = ref()
// email
const email = ref();
const emailErrors = ref()
// password
const password = ref();
const passwordErrors = ref()
const showPassword = ref(false);
// isLoading
const isLoading = ref(false)

//  Show & Hide Password
function togglePassword() {
  showPassword.value = !showPassword.value
}
// Use router Store \\
let store = useRouter();

function userValidation() {
  if (!userName.value) {
    userErrors.value = "";
    return;
  }
  const checkAlphabet = (userName.value.match(/[a-zA-Z]/g) || []).length;
  const checkNumber = (userName.value.match(/[0-9]/g) || []).length;

  let userError = [];

  if (checkAlphabet < 4) userError.push("At least 4 letters");
  if (checkNumber < 2) userError.push("At least 2 numbers");

  userErrors.value = userError.join(" , ");
}


// E-mail Validation \\

function emailValidation() {
  if (!email.value) {
    emailErrors.value = "";
    return;
  }
  const checkSpecial = (email.value.match(/[@]/g) || []).length;
  const checkAlphabet = (email.value.match(/[a-zA-Z]/g) || []).length;
  // const checkNumber = (email.value.match(/[0-9]/g) || []).length;

  let emailError = [];
  if (checkAlphabet < 2) emailError.push("At least 2 letters");
  // if (checkNumber < 2) emailError.push("At least 2 numbers");
  if (checkSpecial < 1) emailError.push("at @ special character");
  emailErrors.value = emailError.join(" , ");
}

// Password Validation \\
function passwordValidation() {
  if (!password.value) {
    passwordErrors.value = "";
    return;
  }
  const checkSpecial = (password.value.match(/[!@#$%*(),.?;":{}|<>]/g) || []).length;
  const checkAlphabet = (password.value.match(/[a-zA-Z]/g) || []).length;
  const checkNumber = (password.value.match(/[0-9]/g) || []).length;

  let passwordError = [];

  if (checkSpecial < 1) passwordError.push("Include at least 1 special character");
  if (checkAlphabet < 4) passwordError.push("At least 4 letters");
  if (checkNumber < 2) passwordError.push("At least 2 numbers");

  passwordErrors.value = passwordError.join(" , ");
};


// all Function call in one function
async function handleSubmit() {
  // Run validations first


  userValidation();
  emailValidation();
  passwordValidation();

  if (userErrors.value || emailErrors.value || passwordErrors.value) {
    return; // stop if validation errors
  }

  try {
    isLoading.value = true;
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const userData = userCredential.user;

    // Store extra details in Realtime Database
    await set(dbRef(database, 'users/' + userData.uid), {
      userName: userName.value,
      email: email.value,
      password: password.value,
      createdAt: new Date().toISOString()
    });

    // Success alert then redirect
    Swal.fire({
      title: 'Signup Successful!',
      text: 'Welcome to your dashboard.',
      icon: 'success',
      confirmButtonText: 'Go to Dashboard'
    }).then(() => {
      store.push('/Dashbord'); // redirect to dashboard
    });

    // Reset form
    document.getElementById('myForm').reset();

  } catch (error) {
    Swal.fire({
      title: 'Signup Failed',
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
.container {
  min-height: 40vh;
  margin-top: 90px;

}
 
</style>
