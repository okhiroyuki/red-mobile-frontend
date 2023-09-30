<script setup>
import logo from "@/assets/logo.png";
</script>
<template>
  <v-list>
    <v-list-item title="RedMobile">
      <template v-slot:prepend>
        <v-avatar size="36px">
          <v-img v-bind:src="logo" />
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
</template>
