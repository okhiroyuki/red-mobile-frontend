<template :key="select">
  <div v-if="isSelect0">
    <FlowPage />
  </div>
  <div v-else-if="isSelect1">
    <EnvPage />
  </div>
  <div v-else>
    <ModulePage />
  </div>
</template>

<script>
// @ is an alias to /src
import FlowPage from "@/components/Flows.vue";
import EnvPage from "@/components/Env.vue";
import ModulePage from "@/components/Modules.vue";

let selectWatch;

export default {
  name: "License",
  components: {
    FlowPage,
    EnvPage,
    ModulePage,
  },
  data: () => ({
    select: 0,
  }),
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
  beforeDestroy() {
    selectWatch();
  },
};
</script>
