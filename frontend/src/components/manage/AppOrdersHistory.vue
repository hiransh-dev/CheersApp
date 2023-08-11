<template>
  <div class="d-flex flex-column w-100">
    <div class="align-self-center w-50">
      <lineChart
        v-if="loadChart === true"
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
    <div class="d-flex flex-row">
      <v-date-picker
        class="ma-2 bg-black"
        v-model="date"
        label="Date"
        @click="getOrderHistory()"
        required
      ></v-date-picker>
      <v-card class="ma-2 pa-2 bg-black align-self-baseline">
        <v-card-subtitle>Total Orders:</v-card-subtitle>
        <v-card-title>{{ noOrders }}</v-card-title>
      </v-card>
      <v-card class="ma-2 pa-2 bg-black align-self-baseline">
        <v-card-subtitle>Total Earnings:</v-card-subtitle>
        <v-card-title>£ {{ ordersTotal }}</v-card-title>
      </v-card>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <v-card
        class="d-flex flex-column ma-2 pa-2 bg-blue-darken-4"
        v-for="order of orderHistory"
        :key="order._id"
      >
        <v-card-title>
          <label>Table no: {{ order.tableNo }}</label
          ><br />
          <label>Order Total: £{{ order.orderTotal }}</label>
        </v-card-title>
        <v-card-subtitle>{{ order._id }}</v-card-subtitle>
        <v-card-text>
          <v-divider thickness="4" color="black"></v-divider>
          Customer Name: {{ order.author.firstName }} {{ order.author.lastName }} <br />
          Phone Number: {{ order.author.phoneNumber }} <br />
          <v-divider thickness="4" color="black"></v-divider>
          Ordered on: {{ readDate(order.createdAt) }}
          <v-list rounded="lg" class="my-2 bg-black">
            <v-list-item v-for="orderItem of order.orderItems" :key="orderItem">
              <label>
                {{ orderItem.item.title }}
              </label>
              <label> x{{ orderItem.quantity }} </label>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { VDatePicker } from "vuetify/labs/VDatePicker";
import axios from "axios";

import { Line as lineChart } from "vue-chartjs";
import Chart from "chart.js/auto";
Chart.register();

export default {
  data() {
    return {
      orderHistory: [],
      noOrders: 0,
      noOrdersTemp: 0,
      ordersTotal: 0,
      ordersTotalTemp: 0,
      date: new Date(),
      timerFunc: null,
      loadChart: false,
      chartOptions: {
        responsive: true,
        xAxis: {
          ticks: {
            beginAtZero: false,
            align: "end"
          }
        }
      },
      chartData: {
        labels: ["7", "6", "5", "4", "3", "2", "1"],
        datasets: [
          {
            label: "Last 7 Days",
            data: [],
            borderColor: "rgb(0, 0, 0)",
            tension: 0.1
          }
        ]
      },
      orderTotalChart: []
    };
  },
  components: {
    VDatePicker,
    lineChart
  },
  methods: {
    timerOrderHistory() {
      this.timerFunc = setInterval(() => {
        this.getOrderHistory();
      }, 3000);
    },
    async getOrderHistory() {
      const orderHistory = await axios.get(`/api/order/allorders/${this.date}`);
      // console.log(`/api/order/allorders/${this.date}`);
      // this.orderHistory = [];
      this.orderHistory = orderHistory.data;
      this.noOrdersTemp = 0;
      this.ordersTotalTemp = 0;
      this.orderHistory.forEach((item) => {
        this.noOrdersTemp++;
        this.ordersTotalTemp = parseFloat(this.ordersTotalTemp + item.orderTotal);
      });
      if (this.noOrders !== this.noOrdersTemp && this.ordersTotal !== this.ordersTotalTemp) {
        this.noOrders = this.noOrdersTemp;
        this.ordersTotal = this.ordersTotalTemp;
      }
    },
    readDate(date) {
      const fullDate = new Date(date);
      const readableDate = `${fullDate.toDateString()}, ${fullDate.getHours()}:${fullDate.getMinutes()}`;
      return readableDate;
    },
    async getChartHistory() {
      const chartHistory = await axios.get(`/api/order/chart`);
      console.log(chartHistory.data);
      chartHistory.data.forEach((item) => {
        console.log(item.orderTotal);
        this.orderTotalChart.push(parseFloat(item.orderTotal));
      });
      let i = this.orderTotalChart.length;
      for (i; i < 7; i++) {
        this.orderTotalChart.unshift(0);
      }
      this.chartData.datasets[0].data = this.orderTotalChart;
      this.loadChart = true;
    }
  },
  mounted() {
    this.getOrderHistory();
    this.timerOrderHistory();
    this.getChartHistory();
  },
  beforeUnmount() {
    clearInterval(this.timerFunc);
  }
};
</script>

<style scoped></style>
