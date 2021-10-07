<template>
  <div>
    <v-navigation-drawer
      v-model="drawerLeft"
      :mini-variant.sync="mini1"
      permanent
      app
      left
      color="#91dbe4"
    >
      <v-list-item class="left px-2">
        <v-btn icon @click.stop="mini1 = !mini1">
          <v-icon>{{
            this.mini1 ? "mdi-chevron-right" : "mdi-chevron-left"
          }}</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list class="left-list" nav>
        <v-list-item-group mandatory>
          <v-list-item
            v-for="item in routes1"
            :key="item.name"
            link
            :to="'/' + item.route"
          >
            <v-list-item-action>
              <v-img
                class="menu-icon"
                :src="require(`@/assets/images/sider/${item.image}.png`)"
                alt
              ></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerRight"
      :mini-variant.sync="mini2"
      permanent
      app
      right
      color="#91dbe4"
    >
      <v-list-item class="right px-2">
        <v-btn icon @click.stop="mini2 = !mini2">
          <v-icon>{{
            this.mini2 ? "mdi-chevron-left" : "mdi-chevron-right"
          }}</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list class="right-list" nav>
        <v-list-item-group mandatory>
          <v-list-item
            v-for="item in routes2"
            :key="item.name"
            link
            :to="'/' + item.route"
          >
            <v-list-item-action v-if="mini2">
              <v-img
                class="menu-icon"
                :src="require(`@/assets/images/sider/${item.image}.png`)"
                alt
              ></v-img>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-img
                class="menu-icon"
                :src="require(`@/assets/images/sider/${item.image}.png`)"
                alt
              ></v-img>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawerLeft: true,
      routes1: [
        {
          name: "Passport",
          image: "passport",
          route: "passport",
        },
        {
          name: "Alarm",
          image: "alarm-clock",
          route: "",
        },
        {
          name: "Meeting",
          image: "agile-team",
          route: "",
        },
      ],
      mini1: false,
      drawerRight: true,
      items2: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      mini2: true,
      routes2: [
        {
          name: "Travel",
          image: "traveling",
          route: "",
        },
        {
          name: "Bills",
          image: "bill",
          route: "",
        },
        {
          name: "Debt",
          image: "debt",
          route: "",
        },
      ],
    };
  },
  watch: {
    mini1: function (val) {
      if (val) {
        this.mini2 = false;
      } else this.mini2 = true;
    },
    mini2: function (val) {
      if (val) {
        this.mini1 = false;
      } else this.mini1 = true;
    },
  },
  methods: {},
};
</script>

<style lang="scss">
.left-list {
  .v-item-group.theme--light.v-list-item-group {
    text-align: left;
    a.v-list-item.v-list-item--link.theme--light {
      border: 1px solid;
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 0 5px !important;
    }
  }
}
.right-list {
  .v-item-group.theme--light.v-list-item-group {
    text-align: right;
    a.v-list-item.v-list-item--link.theme--light {
      border: 1px solid;
      border-radius: 10px;
      margin-bottom: 20px;
      padding: 0 5px !important;
    }
  }
}
.menu-icon {
  max-width: 30px;
}
.left.px-2.v-list-item.theme--light {
  margin-top: 60px;
  justify-content: right;
}
.right.px-2.v-list-item.theme--light {
  margin-top: 60px;
  justify-content: left;
}
.v-application--is-ltr .v-list-item__action:last-of-type:not(:only-child),
.v-application--is-ltr .v-list-item__avatar:last-of-type:not(:only-child),
.v-application--is-ltr .v-list-item__icon:last-of-type:not(:only-child) {
  margin-left: 32px !important;
}
</style>
