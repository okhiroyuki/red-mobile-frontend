<script setup lang="ts">
import { mdiPaperclip } from "@mdi/js";

import { computed, ref } from "vue";
import { getFile } from "../cordova/util";

const emits = defineEmits<{
  selectFile: [file: { uri: string; name: string }];
}>();
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  metadata: {
    type: String,
    required: false,
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
});
const filename = ref("");
const label = ref(props.label);
const metadata = ref(props.metadata);

const select = async () => {
  const file = await getFile(metadata.value);
  if (file) {
    filename.value = file.name;
    emits("selectFile", file);
  }
};

const disabled = computed(() => {
  return props.disabled;
});
</script>
<template>
  <v-text-field
    :label="label"
    :model-value="filename"
    :disabled="disabled"
    @click="select"
    :prepend-icon="mdiPaperclip"
  >
  </v-text-field>
</template>
