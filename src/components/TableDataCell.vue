<template>
  <th v-if="isHeaderCell" :style="styleString">
    <div :class="className">{{ value }}</div>
  </th>
  <td v-else :class="className">{{ value }}</td>
</template>


<script>
export default {
  name: "TableDataCell",
  props: {
    value: { type: [String, Number], default: 0.0 },
    cellType: {
      type: String,
      required: true,
    },
    widthStyle: String,
  },

  computed: {
    className() {
      console.log(this.value, typeof this.value);
      let classStr = "cell";
      switch (this.cellType) {
        case "rowHead":
          classStr += " row-head";
          break;
        case "colHead":
          classStr += " col-head";
          break;
        case "agg":
          classStr += " agg";
          if (this.value > 4) classStr += " agg-green";
          else if (this.value > 2 && this.value <= 4) classStr += " agg-yellow";
          else classStr += " agg-red";
          break;
        case "value":
          if (this.value > 4) classStr += " green";
          else if (this.value > 2 && this.value <= 4) classStr += " yellow";
          else classStr += " red";
      }
      return classStr;
    },
    isHeaderCell() {
      return this.cellType == "colHead";
    },
    styleString() {
      return `width: ${this.widthStyle}%`;
    },
  },
  methods: {},
};
</script>

<style>
.cell {
  text-align: center;
  vertical-align: middle;
  color: #0a4693;
  padding: 0.5rem 0.7rem;
  border: 3px solid black;
  font-weight: bold;
}
.row-head {
  background: #e9e9e9;
  border-color: #f0f0f0;
  text-transform: capitalize;
}

.col-head {
  background: #383838;
  color: white;
  border-color: #787878;
}
.agg {
  color: white !important;
}
.agg-red {
  background: #ae3c2c;
  border-color: #7b0707;
}
.agg-yellow {
  background: #bd8f00;
  border-color: #f1c232;
}
.agg-green {
  background: #016b18;
  border-color: #016e19;
}
.red {
  border-color: #7b0707;
  background: #dc9d9d;
}
.yellow {
  background: #fff6dc;
  border-color: #f1c232;
}
.green {
  background: #016e19;
  border-color: #016b18;
}
</style>