import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    dataSet: [],
    defns: [],
  },
  actions: {
    async fetchApi({ commit }) {
      if (this.state.dataSet.length || this.state.defns.length) return;
      axios
        .get("https://run.mocky.io/v3/09a1870d-294b-4d53-ac4f-87b676ddd000")
        .then((res) => commit("initialize", res.data));
    },
  },
  mutations: {
    initialize: (state, payload) => {
      state.defns = payload.definitions;
      state.dataSet = payload.data;
    },
  },
  getters: {
    getManagersArray: (state) => {
      let mngrs = [];
      state.dataSet.forEach((dataObj) => {
        if (!mngrs.includes(dataObj.manager)) mngrs.push(dataObj.manager);
      });
      return mngrs;
    },
    getIndexesArray: (state) => {
      let indexes = [];
      state.defns.forEach((defnObj) => {
        if (!indexes.includes(defnObj.index)) indexes.push(defnObj.index);
      });
      return indexes;
    },
    getIndexTopics: (state) => (selectedIndex) => {
      let indexTopics = [];
      if (!selectedIndex) return indexTopics;
      state.defns.forEach((defnObj) => {
        if (defnObj.index == selectedIndex) indexTopics.push(defnObj.topic);
      });
      return indexTopics;
    },
    getCellsData: (state, getters) => (selectedIndex, selectedTopic) => {
      let cellDataObj = {};
      if (!selectedIndex && !selectedTopic)
        // When no index or topic is selected show Indexes Data
        getters.getIndexesArray.forEach((indexVal) => {
          cellDataObj[indexVal] = state.dataSet
            .filter((obj) => obj.parameter == indexVal)
            .map((value) => value.score);
        });
      else if (selectedIndex && !selectedTopic)
        // When index is selected but no topic, show selected Index Data
        getters.getIndexTopics(selectedIndex).forEach((topicVal) => {
          cellDataObj[topicVal] = state.dataSet
            .filter((obj) => obj.parameter == topicVal)
            .map((value) => value.score);
        });
      else {
        // When both selected
        let colHeaders = [];
        state.defns.forEach((defnObj) => {
          if (defnObj.topic == selectedTopic) colHeaders.push(defnObj.subTopic);
        });
        colHeaders.forEach((colHeader) => {
          cellDataObj[colHeader] = state.dataSet
            .filter((obj) => obj.parameter == colHeader)
            .map((value) => value.score);
        });
      }
      return cellDataObj;
    },
  },
});
