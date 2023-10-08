<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  snackbar: Boolean,
  text: String,
});
const snackbar = computed(() => {
  return props.snackbar;
});

const text = computed(() => {
  return props.text;
});
</script>

<template>
  <v-snackbar :model-value="snackbar" :timeout="2000">
    {{ text }}
  </v-snackbar>
</template>
