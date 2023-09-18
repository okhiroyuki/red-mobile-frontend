<template>
  <v-card class="mx-auto" max-width="400">
    <v-list lines="three">
      <v-list-subheader>Permission</v-list-subheader>

      <v-list v-model="settings">
        <v-list-item
          :disabled="permission.location"
          @click="openLocationDialog"
        >
          <template v-slot:prepend>
            <v-checkbox
              :input-value="permission.location"
              :disabled="permission.location"
            />
          </template>

          <v-list-item-title>Location</v-list-item-title>
          <v-list-item-subtitle>
            This app collects location data to enable
            <strong>geolocation</strong>, & <strong>ble</strong> nodes even when
            the app is closed or not in use.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item :disabled="permission.camera" @click="openCameraDialog">
          <template v-slot:prepend>
            <v-checkbox
              :input-value="permission.camera"
              :disabled="permission.camera"
            />
          </template>

          <v-list-item-title>Camera</v-list-item-title>
          <v-list-item-subtitle>
            Use camera functions with the <strong>camera</strong>,
            <strong>camera command</strong>, &
            <strong>qrcode scan</strong> nodes.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item :disabled="permission.storage" @click="openStorageDialog">
          <template v-slot:prepend>
            <v-checkbox
              :input-value="permission.storage"
              :disabled="permission.storage"
            />
          </template>

          <v-list-item-title>Storage</v-list-item-title>
          <v-list-item-subtitle>
            Use storage access when uploading
            <strong>flow</strong>, & <strong>env</strong> files.
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item :disabled="permission.mic" @click="openMicDialog">
          <template v-slot:prepend>
            <v-checkbox
              :input-value="permission.mic"
              :disabled="permission.mic"
            />
          </template>

          <v-list-item-content>
            <v-list-item-title>Microphone</v-list-item-title>
            <v-list-item-subtitle>
              Use access to microphones in
              <strong>speech to text</strong>, & <strong>db</strong> nodes.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          :disabled="permission.bluetooth"
          @click="openBluetoothDialog"
        >
          <template v-slot:prepend>
            <v-checkbox
              :input-value="permission.bluetooth"
              :disabled="permission.bluetooth"
            />
          </template>

          <v-list-item-title>Bluetooth</v-list-item-title>
          <v-list-item-subtitle>
            Use bluetooth in
            <strong>ble</strong> node.
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-list>
  </v-card>
</template>

<style>
.v-list-item-subtitle {
  height: 50px;
}
</style>

<script>
export default {
  data() {
    return {
      settings: [],
    };
  },
  computed: {
    permission() {
      return this.$root.permission;
    },
  },
  methods: {
    openLocationDialog() {
      this.$root.requestPermission("location");
    },
    openCameraDialog() {
      this.$root.requestPermission("camera");
    },
    openStorageDialog() {
      this.$root.requestPermission("storage");
    },
    openMicDialog() {
      this.$root.requestPermission("mic");
    },
    openBluetoothDialog() {
      this.$root.requestPermission("bluetooth");
    },
  },
};
</script>
