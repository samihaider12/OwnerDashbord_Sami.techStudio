<template>
  <div>
    <v-container id="dash" >
    <v-row >
      <!-- Total Users -->
       <v-col cols="12">
        <h1>Dashboard</h1>
       </v-col>   
      <v-col cols="12" md="3" class="text-center">
        <v-card class="pa-4" elevation="4">
          <v-row align="center" justify="center">
            <v-col cols="9">
               <v-icon size="40"  color="primary">mdi-account-group</v-icon>
              <h3>Total Users</h3>
              <p class="text-h5 font-weight-bold">1,245</p>
              <small>Active last 30 days</small>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Monthly Sales -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="pa-4" elevation="4">
          <v-row align="center" justify="center">
            <v-col cols="10">
                <v-icon size="40" color="green">mdi-cash</v-icon>
              <h3>Monthly Sales</h3>
              <p class="text-h5 font-weight-bold">$32,000</p>
              <small>Updated just now</small>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- New Visitors -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="pa-4" elevation="4">
          <v-row align="center" justify="center">
            <v-col cols="9">
              <v-icon size="40" color="orange">mdi-earth</v-icon>
              <h3>New Visitors</h3>
              <p class="text-h5 font-weight-bold">3,870</p>
              <small>From 120 countries</small>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Revenue -->
      <v-col cols="12" md="3" class="text-center">
        <v-card class="pa-4" elevation="4">
          <v-row align="center" justify="center">
            <v-col cols="9" >
              <v-icon size="40" color="purple">mdi-finance</v-icon>
              <h3>Revenue</h3>
              <p class="text-h5 font-weight-bold">$124k</p>
              <small>Year to date</small>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

    </v-row>  

       <v-row  class="mt-5">
      <!-- Sales Chart Card -->
      <v-col cols="12" md="6" >
        <v-card class="pa-3" elevation="3">
          <h3 class="text-h6 mb-4">Sales Overview</h3>
          <div style="height:300px">
            <canvas ref="salesChartRef"></canvas>
          </div>
        </v-card>
      </v-col>

      <!-- Visitors Chart Card -->
      <v-col cols="12" md="6">
        <v-card class="pa-3" elevation="3">
          <h3 class="text-h6 mb-4">Visitors by Country</h3>
          <div style="height:300px">
            <canvas ref="visitorsChartRef"></canvas>
          </div>
        </v-card>
      </v-col>
    </v-row>
    
     
  </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

// Chart.js register
Chart.register(...registerables);

// Refs for chart canvas
const salesChartRef = ref(null);
const visitorsChartRef = ref(null);

onMounted(() => {
  // Sales Line Chart
  new Chart(salesChartRef.value, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales ($)",
          data: [5000, 8000, 6000, 10000, 12000, 9000],
          borderColor: "#42a5f5",
          backgroundColor: "rgba(66, 165, 245, 0.2)",
          fill: true,
          tension: 0.3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Visitors Doughnut Chart
  new Chart(visitorsChartRef.value, {
    type: "doughnut",
    data: {
      labels: ["USA", "India", "UK", "Others"],
      datasets: [
        {
          data: [45, 25, 15, 15],
          backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ab47bc"]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
});
</script>

<style>
#dash{
  margin-top: 80px;
}
h3 {
  margin-bottom: 4px;
}
#visit{
height: 200px;
}
</style>
