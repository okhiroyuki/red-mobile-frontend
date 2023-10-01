<script setup>
import { computed } from "vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  disabled: {
    type: Boolean,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const disabled = computed(() => {
  return props.disabled;
});
const loading = computed(() => {
  return props.loading;
});
const click = () => {
  emits("click");
};
</script>
<template>
  <v-btn
    class="ma-1 white--text"
    color="red darken-4"
    :disabled="disabled"
    :loading="loading"
    @click="click"
  >
    Reset
  </v-btn>
</template>
