import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "././assets/css/styles.scss";
import AppFilter from "./plugins/appFilter.plugin";
import VueMask from 'v-mask'
Vue.use(VueMask);
Vue.use(AppFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
