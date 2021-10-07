<template>
  <div>
    <v-app-bar color="#ffff" dense dark app height="60">
      <v-toolbar-title></v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu :close-on-content-click="false" :nudge-width="120" offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="transparent" dark depressed v-bind="attrs" v-on="on">
            <v-icon color="#000000">mdi-account-outline</v-icon><v-icon color="#000000">mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list style="padding:0">
            <v-list-item>
              <v-avatar color="#ea8688" size="40">
                <span class="white--text text-h5" v-if="user.user">{{
                  user.user.charAt(0).toUpperCase()
                }}</span>
              </v-avatar>

              <v-list-item-content>
                <v-list-item-title
                  style="text-align:left;margin-left:10px;font-weight:600"
                  >@{{ user.user }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              style="background-color:#ffff;border:1px solid gray"
              block
              small
              depressed
              @click="logout"
            >
              Logout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { getAuthSession, logout } from "@/helpers/auth.helper";
export default {
  data() {
    return {
      user: {
        user: "",
      },
    };
  },
  methods: {
    logout() {
      logout();
      this.$router.go({ name: "login" });
    },
  },
  mounted() {
    this.user = getAuthSession();
  },
};
</script>
