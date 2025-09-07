<template>
  <div class="container " id="signup"  >
    <!-- Signup Form -->
    <div class="row justify-content-center" style="background-color: aliceblue;">
      <div class="col-md-5">
        <div class="card shadow p-4">
          <h3 class="text-center mb-4">Signup Form</h3>
          <form @submit.prevent="handleSubmit" id="myForm">

            <!-- Username -->
            <div class="floating-label">
              <input v-model="userName" type="text" @blur="userValidation"
                     id="userName" required>
              <label for="userName">Username</label>
              <p v-if="userErrors" class="text-danger">{{ userErrors }}</p>
            </div>

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
                    {{ isLoading ? 'Submitting...' : 'Submit' }}
                  </button>
            </div>
            <p class="text-center mt-2">Already have an account? <router-link to="/login"> Login</router-link></p>
          </form>
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
let store =useRouter();

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
    isLoading.value =true ;
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
  finally{
    isLoading.value = false;
  }
  }


</script>

<style scoped>
#signup{
  margin-top: 100px;
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
