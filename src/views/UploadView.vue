<template :key="select">
  <div v-if="isSelect0">
    <UploadFlows />
  </div>
  <div v-else-if="isSelect1">
    <UploadEnv />
  </div>
  <div v-else>
    <UploadModules />
  </div>
</template>

<script>
// @ is an alias to /src
import UploadFlows from "../components/UploadFlows.vue";
import UploadEnv from "../components/UploadEnv.vue";
import UploadModules from "../components/UploadModules.vue";

let selectWatch;

export default {
  name: "UploadView",
  components: {
    UploadFlows,
    UploadEnv,
    UploadModules,
  },
  data() {
    return {
      select: 0,
    };
  },
  computed: {
    isSelect0() {
      return Number(this.select) === 0;
    },
    isSelect1() {
      return Number(this.select) === 1;
    },
  },
  created() {
    selectWatch = this.$root.$watch("selectTab", (n) => {
      this.select = n;
    });
  },
  beforeUnmount() {
    selectWatch();
  },
};
</script>
