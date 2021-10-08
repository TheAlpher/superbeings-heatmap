<template>
  <div id="app">
    <HeatMap />
  </div>
</template>

<script>
import HeatMap from "./components/HeatMap.vue";

export default {
  name: "App",
  components: {
    HeatMap,
  },
};
</script>

<style>
#app {
  font-family: Arial;
}
</style>
