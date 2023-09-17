<template :key="select">
  <div v-if="isSelect0">
    <FlowComponent />
  </div>
  <div v-else-if="isSelect1">
    <EnvComponent />
  </div>
  <div v-else>
    <ModuleComponent />
  </div>
</template>

<script>
// @ is an alias to /src
import FlowComponent from "@/components/FlowComponent.vue";
import EnvComponent from "@/components/EnvComponent.vue";
import ModuleComponent from "@/components/ModuleComponent.vue";

let selectWatch;

export default {
  name: "UploadView",
  components: {
    FlowComponent,
    EnvComponent,
    ModuleComponent,
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
  beforeUnmount() {
    selectWatch();
  },
};
</script>
