<script setup>
import { mdiCloudUpload } from "@mdi/js";

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
    color="teal darken-1"
    :disabled="disabled"
    :loading="loading"
    @click="click"
  >
    Upload
    <v-icon right dark>{{ mdiCloudUpload }}</v-icon>
  </v-btn>
</template>
