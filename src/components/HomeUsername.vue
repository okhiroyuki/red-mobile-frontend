<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});

const username = computed(() => {
  return props.username;
});
const disabled = computed(() => {
  return props.disabled;
});
</script>

<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        :v-model="username"
        type="text"
        :disabled="disabled"
        label="Username"
      />
    </v-col>
  </v-row>
</template>
