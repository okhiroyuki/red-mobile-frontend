<template>
  <v-card class="mx-auto" max-width="400">
    <v-list flat subheader lines="three">
      <v-list-subheader>Permission</v-list-subheader>

      <v-list-item-group v-model="settings" multiple active-class="">
        <v-list-item
          :disabled="permission.location"
          @click="openLocationDialog"
        >
          <v-list-item-action>
            <v-checkbox
              :input-value="permission.location"
              :disabled="permission.location"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Location</v-list-item-title>
            <v-list-item-subtitle style="height: 50px">
              This app collects location data to enable
              <strong>geolocation</strong>, & <strong>ble</strong> nodes even
              when the app is closed or not in use.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :disabled="permission.camera" @click="openCameraDialog">
          <v-list-item-action>
            <v-checkbox
              :input-value="permission.camera"
              :disabled="permission.camera"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Camera</v-list-item-title>
            <v-list-item-subtitle>
              Use camera functions with the <strong>camera</strong>,
              <strong>camera command</strong>, &
              <strong>qrcode scan</strong> nodes.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :disabled="permission.storage" @click="openStorageDialog">
          <v-list-item-action>
            <v-checkbox
              :input-value="permission.storage"
              :disabled="permission.storage"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Storage</v-list-item-title>
            <v-list-item-subtitle>
              Use storage access when uploading
              <strong>flow</strong>, & <strong>env</strong> files.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :disabled="permission.mic" @click="openMicDialog">
          <v-list-item-action>
            <v-checkbox
              :input-value="permission.mic"
              :disabled="permission.mic"
            />
          </v-list-item-action>

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
          <v-list-item-action>
            <v-checkbox
              :input-value="permission.bluetooth"
              :disabled="permission.bluetooth"
            />
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Bluetooth</v-list-item-title>
            <v-list-item-subtitle>
              Use bluetooth in
              <strong>ble</strong> node.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    settings: [],
  }),
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
