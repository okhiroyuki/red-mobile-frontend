<script setup>
import { mdiOpenInNew } from "@mdi/js";
import { computed } from "vue";

const emits = defineEmits(["clickButton"]);
const props = defineProps({
  loading: Boolean,
  title: String,
  isStarted: Boolean,
});

const loading = computed(() => {
  return props.loading;
});
const title = computed(() => {
  return props.title;
});
const isStarted = computed(() => {
  return props.isStarted;
});
const clickButton = () => {
  emits("clickButton");
};
</script>

<template>
  <v-row class="mt-1">
    <v-col>
      <v-btn
        color="teal darken-1"
        class="white--text"
        :disabled="loading"
        :loading="loading"
        elevation="4"
        block
        size="x-large"
        style="text-transform: none"
        @click="clickButton"
      >
        {{ title }}
        <v-icon v-if="isStarted"> {{ mdiOpenInNew }}</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
