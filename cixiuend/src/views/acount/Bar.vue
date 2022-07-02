<template>
  <div class="acount-bar">
    <h3 class="title">{{ title }}</h3>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    d: {
      type: Object,
      default: () => {
        return {
          bar: [],
          barNum: [],
        };
      },
    },
    title: {
      type: String,
      default: () => "传承人分布",
    },
  },
  data() {
    return {
      chartData: {
        labels: ["January", "February"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  created() {
    this.chartData.labels = this.d["bar"];
    this.chartData.datasets[0].data = this.d["barNum"];
  },
};
</script>
<style lang="scss" scoped>
.acount-bar {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .title {
    padding: 10px 0;
  }
}
</style>