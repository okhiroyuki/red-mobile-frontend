<template>
  <v-tabs v-model="model" fixed-tabs>
    <v-tab v-for="(item, i) in items" :key="i" :href="`#tab-${i}`" @click="click(`${i}`)">
      {{ item.title }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  data: () => ({
    model: "tab-0",
    items: [
      { title: "Flows", to: "/flows" },
      { title: "Env", to: "/env" },
      { title: "Modules", to: "/modules" },
    ],
  }),
  methods: {
    click(i) {
      this.$root.selectTab = i;
    },
  },
};
</script>
