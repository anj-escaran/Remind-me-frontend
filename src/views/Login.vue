<template>
  <v-app>
    <div class="login-wrapper full-height">
      <router-view />
    </div>
  </v-app>
</template>
<style lang="scss">
.login-wrapper {
  background-color: transparent;
  background-image: url("../../src/assets/images/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 1;
}
</style>
