<script setup lang="ts">
import { mdiSchool } from "@mdi/js";
</script>
<template>
  <v-alert outlined color="blue-grey">
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
