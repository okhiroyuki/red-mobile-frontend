<script setup>
import { mdiSchool } from "@mdi/js";
</script>

<template>
  <v-alert outlined color="blue-grey">
    <v-icon>{{ mdiSchool }}</v-icon>
    <div class="title">How to update the node-module for custom node RED.</div>
    <div>
      <ol>
        <li>
          Generate <strong>node_modules.zip</strong> using this as
          <a
            href="https://github.com/okhiroyuki/redmobile-modules-generator"
            target="_blank"
            >a reference</a
          >.
        </li>
        <li>
          Set the generated <strong>node_modules.zip</strong> to the Android
          device.
        </li>
        <li>Select the <strong>node_modules.zip</strong> file.</li>
        <li>Press upload button to automatically restart the system.</li>
        <li>it will be reflected after reboot.</li>
      </ol>
      <br />
      <strong>Note: </strong>
      <p>
        Reset to initialize to the preset contents. Be sure to reboot in this
        case as well.
      </p>
    </div>
  </v-alert>
</template>
