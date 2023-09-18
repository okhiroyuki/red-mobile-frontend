<template>
  <v-card :loading="isLoading">
    <v-card-text>{{ data }} </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    data: "",
  }),
  computed: {
    isLoading() {
      return this.data.length === 0;
    },
  },
  created() {
    const url = "https://red-mobile.github.io/privacypolicy/";
    this.axios.get(url).then(
      (res) => {
        const parser = new DOMParser();
        const psd1 = parser.parseFromString(res.data, "text/html");
        this.data = psd1.querySelector(".page").innerHTML;
      },
      (err) => {
        this.data = err.message;
      },
    );
  },
};
</script>
