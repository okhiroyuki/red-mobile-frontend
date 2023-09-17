<template>
  <v-list nav>
    <v-list-item>
      <v-list-item-avatar>
        <img src="@/assets/logo.png" />
      </v-list-item-avatar>
      <v-list-item-content> RedMobile </v-list-item-content>
    </v-list-item>
    <v-divider />

    <v-list-item-group v-model="selectedItem" active-class="text--accent-4">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        :target="item.target"
        @click="click(`${i}`)"
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.text" />
        </v-list-item-content>
        <v-icon v-if="item.subIcon" v-text="item.subIcon" />
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-information-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="getVersion" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    version: String,
  },
  data: () => ({
    selectedItem: 1,
  }),
  computed: {
    items() {
      return [
        {
          text: "Home",
          icon: "mdi-home",
          to: "/",
          target: "",
          subIcon: "",
        },
        {
          text: "Upload",
          icon: "mdi-cloud-upload",
          to: "/upload",
          target: "",
          subIcon: "",
        },
        {
          text: "Setting",
          icon: "mdi-cog",
          to: "/setting",
          target: "",
          subIcon: "",
        },
        {
          text: "License",
          icon: "mdi-license",
          to: "/license",
          target: "",
          subIcon: "",
        },
        {
          text: "Privacy Policy",
          icon: "mdi-note-text",
          to: "/policy",
          target: "",
          subIcon: "",
        },
        {
          text: "Feedback",
          icon: "mdi-google-play",
          to: "",
          target: "",
          subIcon: "mdi-open-in-new",
        },
      ];
    },
    getVersion() {
      return `Version ${this.version}`;
    },
  },
  methods: {
    click(i) {
      this.$emit("event-click", i);
    },
  },
};
</script>
