<script setup lang="ts">
import { mdiSchool } from "@mdi/js";
</script>
<template>
  <v-alert outlined color="blue-grey">
    <v-icon>{{ mdiSchool }}</v-icon>
    <div class="title">Using environment variables</div>
    <div>
      <p>
        Please prepare env.txt. Environment variables should be added on a new
        line in the form of
        <code>NAME=VALUE</code>.
      </p>
      <p>For example:</p>
      <blockquote>
        DB_HOST=localhost<br />
        DB_USER=root<br />
        DB_PASS=s1mpl3<br />
      </blockquote>
      <br />
      <p>
        Environment variables will always be overwritten. If you want to delete
        the content, please RESET.
      </p>
      <p>
        To use environment variables in Node-RED, see
        <a
          href="https://nodered.org/docs/user-guide/environment-variables"
          target="_blank"
          >here</a
        >.
      </p>
    </div>
  </v-alert>
</template>
