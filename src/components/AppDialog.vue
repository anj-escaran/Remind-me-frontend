<template>
  <div class="dialog-wrapper">
    <v-row justify="center">
      <v-dialog
        style="height: 100% !important"
        class="dialog-middle"
        @click:outside="closeDialog"
        :value="showDialog"
        :width="dialogWidth"
      >
        <slot name="dialogbody"></slot>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    dialogWidth: {
      type: Number,
      default: 0,
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close", false);
    },
  },
};
</script>
