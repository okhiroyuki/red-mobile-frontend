<script setup>
import { computed } from "vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  disabled: {
    type: Boolean,
    required: true,
  },
});

const disabled = computed(() => {
  return props.disabled;
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
    @click="click"
  >
    Reset
  </v-btn>
</template>
