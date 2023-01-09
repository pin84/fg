<template>
  <div class="pie">
    <h3 class="title">{{ title }}</h3>
    <Pie
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
import { Pie } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "PieChart",
  components: {
    Pie,
  },
  props: {
    chartId: {
      type: String,
      default: "pie-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 230,
    },
    height: {
      type: Number,
      default: 230,
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
      default: () => "传承人占比",
    },
  },
  data() {
    return {
      chartData: {
        labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
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
.pie {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .title {
    padding: 10px 0;
  }
}
</style>
