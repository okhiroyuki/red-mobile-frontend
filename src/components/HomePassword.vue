<script setup lang="ts">
import { mdiEye, mdiEyeOff } from "@mdi/js";

import { computed, ref, watch } from "vue";

const emits = defineEmits<{
  update: [value: string];
}>();

const props = defineProps({
  password: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: true,
  },
});
const showPassword = ref(false);

const password = ref(props.password);
const disabled = computed(() => {
  return props.disabled;
});

watch(
  () => password.value,
  () => {
    emits("update", password.value);
  },
);
</script>
<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        v-model="password"
        label="Password"
        :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
        :type="showPassword ? 'text' : 'password'"
        :disabled="disabled"
        @click:append-inner="showPassword = !showPassword"
      />
    </v-col>
  </v-row>
</template>
