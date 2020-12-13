import Vue from "vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import App from "./App";

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app');
