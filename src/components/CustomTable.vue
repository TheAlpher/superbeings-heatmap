<template>
  <table class="data-table">
    <tr>
      <th class="special-headers manager-header">
        <div>
          <i class="fa fa-user"></i
          ><span>&nbsp;&nbsp;|&nbsp;&nbsp;</span> Managers
        </div>
      </th>
      <table-data-cell
        v-for="colHeader in getColHeaders"
        :key="colHeader"
        :widthStyle="widthStyle"
        cellType="colHead"
        :value="colHeader"
      />
    </tr>
    <tr v-for="(manager, index) in getManagersArray" :key="index">
      <table-data-cell :value="manager" cellType="rowHead" />
      <table-data-cell
        v-for="colHeader in getColHeaders"
        :key="colHeader"
        :widthStyle="widthStyle"
        :value="getCellData(colHeader, index)"
        cellType="value"
      />
    </tr>
    <tr>
      <td class="special-headers aggregate-header">
        <i class="fas fa-bookmark"></i
        ><span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>Aggregate
      </td>
      <table-data-cell
        v-for="colHeader in getColHeaders"
        :key="colHeader"
        :widthStyle="widthStyle"
        :value="getColumnAggregate(colHeader)"
        cellType="agg"
      />
    </tr>
  </table>
</template>

<script>
import TableDataCell from "./TableDataCell.vue";
import { mapGetters } from "vuex";
export default {
  name: "CustomTable",
  components: {
    TableDataCell,
  },
  props: {
    selectedIndex: String,
    selectedTopic: String,
  },
  computed: {
    ...mapGetters(["getManagersArray", "getCellsData"]),
    getColHeaders() {
      return Object.keys(
        this.getCellsData(this.selectedIndex, this.selectedTopic)
      );
    },
    getCellData() {
      return (colHeader, index) =>
        this.getCellsData(this.selectedIndex, this.selectedTopic)[colHeader][
          index
        ];
    },
    getColumnAggregate() {
      return (colHeader) => {
        let valArray = this.getCellsData(
          this.selectedIndex,
          this.selectedTopic
        )[colHeader];
        let valTotal = valArray.reduce((total, val) => {
          return total + Number.parseFloat(val);
        }, 0.0);
        return valTotal / this.getManagersArray.length;
      };
    },
    widthStyle() {
      let val = 82 / this.getColHeaders.length;
      return val;
    },
  },
};
</script>
<style>
.aggregate-header {
  color: white;
  display: flex;
  width: auto !important;
  justify-content: center;
  padding: 0.5rem 0.7rem;
  background: #093e8f;
  border: 3px #093e8f solid;
}

.manager-header div {
  background: black;
  border: 3px solid transparent;
  display: flex;
  justify-content: center;
  padding: 0.4rem 0.7rem;
  font-size: 0.9rem;
}
.data-table {
  width: 70vw;
}
.data-table > tr:nth-of-type(1) {
  background-color: rgb(206, 205, 205);
}
.data-table > tr:nth-of-type(1) th {
  padding: 0.3rem 0.5rem;
  color: white;
}
.data-table > tr:nth-of-type(1) th:nth-of-type(1) {
  padding: 0.5rem 0.5rem;
}
tr > :first-child {
  width: 18%;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
}
tr > :nth-child(2) {
  margin-left: 10px;
}
</style>