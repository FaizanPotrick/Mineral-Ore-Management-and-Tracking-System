<script setup>
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const data = {
    chartData: {
        labels: ['January', 'February', 'March'],
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
        ]
    },
    chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
    }
}
const doughnut = {
    chartData: {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
            {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                data: [40, 20, 80]
            }
        ]
    },
    chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
    }
}
</script>
<template>
    <div class="flex flex-col gap-4 min-h-screen">
        <div class="flex gap-4 w-full min-h-[12vh] font-semibold">
            <div
                class="flex flex-col justify-around w-full border-l-4 border-yellow-300 relative p-5 bg-white rounded-md overflow-hidden drop-shadow-md">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="-z-10 absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-yellow-300 opacity-50">
                    <path stroke-width="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-xl">
                    200 mines
                </div>
                <div>
                    NUMBER OF ACTIVE MINERS
                </div>
            </div>
            <div
                class="flex flex-col justify-around w-full border-l-4 border-blue-300 relative p-5 bg-white rounded-md overflow-hidden drop-shadow-md">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="-z-10 absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-blue-300 opacity-50">
                    <path stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div class="text-xl">
                    40 Metric Tons
                </div>
                <div>
                    Average Per iron ore mine per day
                </div>
            </div>
            <div
                class="flex flex-col justify-around w-full border-l-4 border-red-300 relative p-5 bg-white rounded-md overflow-hidden drop-shadow-md">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="-z-10 absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-red-700 opacity-50">
                    <path stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div class="flex justify-center items-center">
                    <div class="w-full rounded-full border border-red-500 shadow-inner drop-shadow-md">
                        <div class="bg-red-500 text-xs text-blue-100 text-center rounded-full" style="width: 45%">
                            45%</div>
                    </div>
                    <div class="text-2xl">
                        50%
                    </div>
                </div>
                <div>
                    Warehouse Capacity
                </div>
            </div>
            <div
                class="flex flex-col justify-around w-full border-l-4 border-green-300 relative p-5 bg-white rounded-md overflow-hidden drop-shadow-md">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="-z-10 absolute right-0 bottom-0 h-32 w-32 -mr-8 -mb-8 text-green-700 opacity-50">
                    <path stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div class="text-xl">
                    950000
                </div>
                <div>
                    Number Of Visitors
                </div>
            </div>
        </div>
        <div class="flex justify-around items-start gap-4 w-full drop-shadow-md">
            <Bar :chart-options="data.chartOptions" :chart-data="data.chartData"
                class="bg-white p-4 w-full rounded-lg" />
            <Doughnut :chart-options="doughnut.chartOptions" :chart-data="doughnut.chartData"
                class="bg-white p-4 rounded-lg" />
        </div>

        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-3 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full font-medium ">
                            <thead class="bg-white border-b">
                                <tr>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        Mine ID
                                    </th>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        Type of Ore
                                    </th>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        Grade
                                    </th>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        Quantity
                                    </th>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        Status
                                    </th>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        Timestamp
                                    </th>
                                    <th scope="col" class="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                        View
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-gray-200 border-b">
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        0x12ojfdasa
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Fine
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Medium
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        100 mt
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Pending
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        2:30 PM
                                        1 June 2022
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        <a href="/Officer_Check" class=" text-blue-500 hover:underline">View
                                            Log</a>
                                    </td>

                                </tr>
                                <tr class="bg-white border-b">
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        0x12ojfdasa
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Lumps
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Medium
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        100 mt
                                    </td>
                                    <td class="text-md  text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Approved
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        2:30 PM
                                        3 June 2022
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        <a href="/Officer_Check" class=" text-blue-500 hover:underline">View Log</a>
                                    </td>
                                </tr>
                                <tr class="bg-gray-200 border-b">
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        0x12ojfdasa
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Lumps
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        High
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        100 mt
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        Rejected
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        2:30 PM
                                        3 June 2022
                                    </td>
                                    <td class="text-md text-gray-900 font-normal px-6 py-4 whitespace-nowrap">
                                        <a href="/Officer_Check" class=" text-blue-500 hover:underline">View Log</a>
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