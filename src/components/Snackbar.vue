<template>
  <v-snackbar v-model="show" :top="top" :color="color">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    message: String,
    top: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
    snackbar: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    show: {
      get() {
        return this.snackbar;
      },
      set() {
        this.$emit("close");
      },
    },
  },
  methods: {},
};
</script>
