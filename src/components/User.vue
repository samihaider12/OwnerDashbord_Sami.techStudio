<template>
  <div  >
    <div class="container " id="user">
    <h2 class="mb-3">Manage Users</h2>

    <div class="input-group mb-5">
      <input 
        type="text" 
        class="form-control" 
        v-model="searchQuery" 
        placeholder="Search by name"
      />
      <button class="btn btn-primary" @click="addUser">Add User</button>
    </div>

    <table class="table table-bordered table-striped align-middle mt-5 ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th style="width: 100px; text-align: center;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="index">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td class="text-center">
            <button class="btn btn-sm btn-outline-primary rounded-circle me-2" @click="editUser(index)" title="Edit">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger rounded-circle" @click="deleteUser(index)" title="Delete">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="3" class="text-center text-muted">No matching users found</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Swal from "sweetalert2";

const STORAGE_KEY = "usersData";
const users = ref([]);
const searchQuery = ref("");

onMounted(() => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    users.value = JSON.parse(savedData);
  } else {
    users.value = [
      { name: "Ali Raza", email: "ali@example.com" },
      { name: "Ayesha Khan", email: "ayesha@example.com" },
      { name: "Zain Khan", email: "zain@example.com" },
    ];
    saveData();
  }
});

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function addUser() {
  const { value: formValues } = await Swal.fire({
    title: "Add New User",
    html: `
      <input id="swal-input1" class="swal2-input" placeholder="Enter Name">
      <input id="swal-input2" class="swal2-input" placeholder="Enter Email">
    `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const name = document.getElementById("swal-input1").value;
      const email = document.getElementById("swal-input2").value;
      if (!name || !email) {
        Swal.showValidationMessage("Both fields are required!");
      }
      return { name, email };
    },
  });

  if (formValues) {
    users.value.push(formValues);
    saveData();
    Swal.fire("Added!", "User has been added.", "success");
  }
}

async function editUser(index) {
  const user = users.value[index];

  const { value: formValues } = await Swal.fire({
    title: "Edit User",
    html: `
      <input id="swal-input1" class="swal2-input" value="${user.name}">
      <input id="swal-input2" class="swal2-input" value="${user.email}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    preConfirm: () => {
      const name = document.getElementById("swal-input1").value;
      const email = document.getElementById("swal-input2").value;
      if (!name || !email) {
        Swal.showValidationMessage("Both fields are required!");
      }
      return { name, email };
    },
  });

  if (formValues) {
    users.value[index] = formValues;
    saveData();
    Swal.fire("Updated!", "User details updated.", "success");
  }
}

function deleteUser(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "This user will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      users.value.splice(index, 1);
      saveData();
      Swal.fire("Deleted!", "User has been deleted.", "success");
    }
  });
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value));
}
</script>


<style>
#user{
    margin-top: 80px;
    height: 89vh;
}
 
</style>

<!-- Bootstrap Icons CDN -->

