<script setup>
import { computed, ref } from "vue";

const rules = ref({
  required: (value) => !!value || "Required.",
});

const props = defineProps({
  port: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});

const port = computed(() => {
  return props.port;
});
const disabled = computed(() => {
  return props.disabled;
});
</script>
<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        v-model="port"
        type="number"
        :disabled="disabled"
        :rules="[rules.required]"
        label="Port"
      />
    </v-col>
  </v-row>
</template>
