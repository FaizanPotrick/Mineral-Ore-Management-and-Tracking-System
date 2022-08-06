<script setup>
import Miner from "@/assets/json/Miner.json";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

const miner = Miner;
console.log(miner);

const data = {
  chartData: {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "High",
        backgroundColor: "#41B883",
        data: [40, 20, 12],
      },
      {
        label: "Medium",
        backgroundColor: "#E46651",
        data: [30, 20, 12],
      },
      {
        label: "Low",
        backgroundColor: "#00D8FF",
        data: [20, 20, 12],
      },
    ],
  },
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
  },
};
const doughnut = {
  chartData: {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
        data: [40, 20, 80],
      },
    ],
  },
  chartOptions: {
    responsive: true,
    maintainAspectRatio: false,
  },
};

</script>
<template>
  <div class="flex flex-col ">
    <div class="flex flex-col">
      <button class="btn bg-blue-200 p-5 font-bold">Logs</button>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-white border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Batch ID
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Mine Name
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Type
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Grade
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity (Tons)
                  </th>
                  <!-- <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Status
                  </th> -->
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Price
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Time Stamp
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mine in miner" :key="mine.batch_id" class="border-b bg-gray-100">
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.batch_id }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Name }}
                  </td>
                  <!-- <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.total_quantity }}
                  </td> -->
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Type }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Grade }}
                  </td>
                  <!-- <td><button class="btn bg-green-300 m-2 px-4 py-2 rounded-md">Accept</button></td>
                  <br>
                  <td><button class="btn bg-red-300 m-2 px-4 py-2 rounded-md">Reject</button></td> -->

                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.quantity }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Price }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Time_Stamp }}
                  </td>
                </tr>


              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <button class="btn bg-blue-200 p-5 font-bold">Miner Logs</button>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="bg-white border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Batch ID
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Mine Name
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Type
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Grade
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Quantity (Tons)
                  </th>
                  <!-- <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Status
                  </th> -->
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Price
                  </th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Time Stamp
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="mine in miner" :key="mine.batch_id" class="border-b bg-gray-100">
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.batch_id }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Name }}
                  </td>
                  <!-- <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.total_quantity }}
                  </td> -->
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Type }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Grade }}
                  </td>
                  <!-- <td><button class="btn bg-green-300 m-2 px-4 py-2 rounded-md">Accept</button></td>
                  <br>
                  <td><button class="btn bg-red-300 m-2 px-4 py-2 rounded-md">Reject</button></td> -->

                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.quantity }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Price }}
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {{ mine.Time_Stamp }}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
