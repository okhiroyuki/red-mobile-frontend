<template>
  <v-list nav>
    <v-list-item>
      <v-avatar size="36px">
        <v-img alt="Avatar" src="/src/assets/logo.png" />
      </v-avatar>
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
          <v-icon icon="item.icon" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
        <v-icon v-if="item.subIcon" icon="item.subIcon" />
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon icon="mdiInformationVariant" />
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ getVersion }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import {
  mdiHome,
  mdiCloudUpload,
  mdiCog,
  mdiLicense,
  mdiNoteText,
  mdiGooglePlay,
  mdiOpenInNew,
  mdiInformationVariant,
} from "@mdi/js";

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    version: String,
  },
  emits: ["event-click"],
  data: () => ({
    selectedItem: 1,
    mdiInformationVariant,
    mdiHome,
    mdiCloudUpload,
    mdiCog,
    mdiLicense,
    mdiNoteText,
    mdiGooglePlay,
    mdiOpenInNew,
    items: [
      {
        text: "Home",
        icon: "mdiHome",
        to: "/",
        target: "",
        subIcon: "",
      },
      {
        text: "Upload",
        icon: "mdiCloudUpload",
        to: "/upload",
        target: "",
        subIcon: "",
      },
      {
        text: "Setting",
        icon: "mdiCog",
        to: "/setting",
        target: "",
        subIcon: "",
      },
      {
        text: "License",
        icon: "mdiLicense",
        to: "/license",
        target: "",
        subIcon: "",
      },
      {
        text: "Privacy Policy",
        icon: "mdiNoteText",
        to: "/policy",
        target: "",
        subIcon: "",
      },
      {
        text: "Feedback",
        icon: "mdiGooglePlay",
        to: "",
        target: "",
        subIcon: "mdiOpenInNew",
      },
    ],
  }),
  computed: {
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
