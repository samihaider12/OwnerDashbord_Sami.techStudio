<template>
<div  >
    <v-container id="carts"  >
    <v-row>
      <v-col cols="12">
        <h2 class="title">📊 Analytics & Charts</h2>
      </v-col>

      <!-- Sales Line Chart -->
      <v-col cols="12" md="6" >
        <v-card class="pa-4" elevation="4" >
          <h3 class="text-h6 mb-4"  >Official Page Visiter</h3>
          <div style="height:300px" >
            <canvas ref="salesChartRef"></canvas>
          </div>
        </v-card>
      </v-col>

      <!-- Monthly Sales Bar Chart -->
       <v-col cols="12" md="6">
    <v-card class="pa-4" elevation="4">
      <h3 class="text-h6 mb-4">Monthly Sales</h3>
      <div style="height:300px">
        <canvas ref="monthlySalesRef"></canvas>
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
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register components
Chart.register(...registerables, ChartDataLabels);

const salesChartRef = ref(null);
const monthlySalesRef = ref(null);

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
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#000" } // dark text for visibility
        },
        datalabels: {
          // color: "#000",
          anchor: "end",
          align: "top",
          formatter: value => `$${value.toLocaleString()}`
        }
      },
      scales: {
        // x: { ticks: { color: "#000" } },
        // y: { ticks: { color: "#000" } }
      }
    }
  });

  // Monthly Sales Bar Chart
  new Chart(monthlySalesRef.value, {
    type: "bar",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales ($)",
          data: [3000, 4500, 4000, 5000, 4800, 5200],
          backgroundColor: "#42a5f5"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#000" }
        },
        datalabels: {
          anchor: "end",
          align: "top",
          formatter: value => `$${value.toLocaleString()}`
        }
      },
      scales: {
        // x: { ticks: { color: "#000" } },
        // y: { ticks: { color: "#000" } }
      }
    }
  });
});
</script>


<style scoped>
#carts {
  margin-top: 80px;
  min-height: 89vh;
}
</style>
