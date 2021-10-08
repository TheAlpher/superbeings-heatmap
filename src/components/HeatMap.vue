<template>
  <div class="map-wrapper">
    <div class="select-drawer">
      <div class="empty-placeholder"></div>
      <vSelect
        class="index-select"
        :clearable="false"
        :options="getIndexesArray"
        placeholder="Select an index"
        @input="updateSelectedIndex"
      />
      <vSelect
        class="topic-select"
        :clearable="false"
        :disabled="!selectedIndex"
        placeholder="Select a topic"
        :options="indexTopicOptions"
        v-model="selectedTopic"
      />
    </div>
    <custom-table
      :selectedIndex="selectedIndex"
      :selectedTopic="selectedTopic"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CustomTable from "./CustomTable.vue";
import vSelect from "vue-select";

export default {
  name: "HeatMap",
  components: { CustomTable, vSelect },
  async mounted() {
    await this.fetchApi();
  },
  computed: {
    ...mapGetters(["getIndexesArray", "getIndexTopics"]),
    indexTopicOptions() {
      console.log(this.selectedIndex, this.getIndexTopics(this.selectedIndex));
      return this.getIndexTopics(this.selectedIndex);
    },
  },
  methods: {
    ...mapActions(["fetchApi"]),
    updateSelectedIndex(val) {
      if (val !== this.selectedIndex) {
        this.selectedIndex = val;
        this.selectedTopic = null;
      }
    },
    updateSelectedTopic(val) {
      this.selectedTopic = val;
    },
  },
  data() {
    return { selectedIndex: null, selectedTopic: null };
  },
};
</script>

<style>
.empty-placeholder {
  width: 18%;
}
.select-drawer {
  display: flex;
  width: 70vw;
}
.index-select {
  width: 17%;
  margin: 3px;
}
.topic-select {
  width: 17%;
  margin: 3px;
}
.index-select .vs__search::placeholder,
.index-select .vs__dropdown-toggle,
.index-select .vs__selected,
.index-select .vs__dropdown-option,
.index-select .vs__dropdown-menu {
  background: #093e8f;
  border: none;
  font-size: 0.8rem;
  color: white !important;
  font-weight: bold;
}
.topic-select .vs__search::placeholder,
.topic-select .vs__dropdown-toggle,
.topic-select .vs__selected,
.topic-select .vs__dropdown-option,
.topic-select .vs__dropdown-menu {
  font-size: 0.8rem;
  color: #093e8f;
  font-weight: bold;
  border-color: #093e8f;
}
.index-select .vs__open-indicator {
  fill: white !important;
}
.topic-select .vs__open-indicator {
  fill: #093e8f !important;
}
.map-wrapper {
  width: 100vw;
  padding: 20vh 15vw;
}
</style>
