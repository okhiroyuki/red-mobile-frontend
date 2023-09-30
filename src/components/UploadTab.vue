<script setup>
import { ref } from "vue";

const emits = defineEmits(["tabTitleClick"]);

const tabTitles = ref(["Flows", "Env", "Modules"]);

const tabTitleClick = (tabTitle) => {
  emits("tabTitleClick", tabTitle);
};
</script>

<template>
  <v-tabs fixed-tabs>
    <v-tab
      v-for="(tabTitle, i) in tabTitles"
      :key="i"
      :href="`#tab-${i}`"
      @click="tabTitleClick(`${tabTitle}`)"
    >
      {{ tabTitle }}
    </v-tab>
  </v-tabs>
</template>
