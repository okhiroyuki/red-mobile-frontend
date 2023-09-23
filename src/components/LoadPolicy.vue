<template>
  <v-card :loading="isLoading">
    <v-card-text>{{ data }} </v-card-text>
  </v-card>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { inject } from "vue";
const axios = inject("axios");

const data = ref("");
const isLoading = computed(() => {
  return data.value.length === 0;
});

onMounted(() => {
  const url = "https://red-mobile.github.io/privacypolicy/";
  axios.get(url).then(
    (res) => {
      const parser = new DOMParser();
      const psd1 = parser.parseFromString(res.data, "text/html");
      data.value = psd1.querySelector(".page").innerHTML;
    },
    (err) => {
      data.value = err.message;
    },
  );
});
</script>
