<script setup>
import { computed, ref, watch } from "vue";

const rules = ref({
  required: (value) => !!value || "Required.",
});

const emits = defineEmits(["update"]);

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

const port = ref(props.port);
const disabled = computed(() => {
  return props.disabled;
});

watch(
  () => port.value,
  () => {
    emits("update", Number(port.value));
  },
);
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
