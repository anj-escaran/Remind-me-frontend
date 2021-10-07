<template>
  <v-app>
    <AppHeader />
    <AppSider />
    <v-main>
      <v-container fluid>
        <v-breadcrumbs
          style="padding-left: 0 !important; position: absolute; top: -5px"
          :items="routes"
        ></v-breadcrumbs>
        <div class="body-application">
          <router-view></router-view>
        </div>
      </v-container>
    </v-main>
    <v-footer app padless>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Remindme</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AppHeader from "../components/layouts/AppHeader";
import AppSider from "../components/layouts/AppSider";
import { titleCase } from "@/helpers/common.helper";

export default {
  components: { AppHeader, AppSider },
  data() {
    return {
      routes: [],
    };
  },
  watch: {
    "$route.path"(val) {
      console.log("watch", val);
      this.getPath(val);
    },
  },
  methods: {
    getPath(val) {
      this.routes = [];
      this.routes.push({
        text: "Home",
        disabled: false,
        href: "/",
      });
      let paths = val.split("/");
      for (let value of paths) {
        if (value) {
          this.routes.push({
            text: titleCase(value),
            disabled: false,
            href: "/" + value,
          });
        }
      }
    },
  },
  created() {
    this.getPath(this.$route.path);
  },
};
</script>
