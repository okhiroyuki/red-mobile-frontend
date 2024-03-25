<script setup lang="ts">
import { computed, ref, watch } from "vue";

const emits = defineEmits(["update"]);

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

const username = ref(props.username);
const disabled = computed(() => {
  return props.disabled;
});

watch(
  () => username.value,
  () => {
    emits("update", username.value);
  },
);
</script>

<template>
  <v-row no-gutters>
    <v-col>
      <v-text-field
        v-model="username"
        type="text"
        :disabled="disabled"
        label="Username"
      />
    </v-col>
  </v-row>
</template>
