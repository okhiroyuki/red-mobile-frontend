<script setup>
import { mdiSchool } from "@mdi/js";
import { computed } from "vue";
const props = defineProps({
  isShow: Boolean,
});

const isShow = computed(() => {
  return props.isShow;
});
</script>
<template>
  <v-alert v-show="isShow" outlined color="blue-grey">
    <v-icon>{{ mdiSchool }}</v-icon>
    <div class="title">Importing and Exporting Flows</div>
    <div>
      Flows can be imported and exported from the editor using their JSON
      format, making it very easy to share flows with others.<br />For more
      information, please refer to
      <a
        href="https://nodered.org/docs/user-guide/editor/workspace/import-export"
        target="_blank"
        >here</a
      >.
    </div>
  </v-alert>
</template>
