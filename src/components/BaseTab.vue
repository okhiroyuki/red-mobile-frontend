<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  titles: {
    type: Array,
    required: false,
    default: () => [],
  },
});
const emits = defineEmits(["tabTitleClick"]);

const titles = ref(props.titles);

const tabTitleClick = (tabTitle: string) => {
  emits("tabTitleClick", tabTitle);
};
</script>

<template>
  <v-tabs grow>
    <v-tab
      v-for="(title, i) in titles"
      :key="i"
      :href="`#tab-${i}`"
      @click="tabTitleClick(`${title}`)"
    >
      {{ title }}
    </v-tab>
  </v-tabs>
</template>
