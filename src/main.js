import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import "./assets/scss/custom.scss";

import BaseModal from "./components/Widgets/BaseModal.vue";
import LoadWidget from "./components/Widgets/LoadWidget.vue";
import CustomAlert from "./components/Widgets/CustomAlert.vue";

// FILTERS
import filters from "./filters/Filters.ts";
import currencyFilters from "./filters/CurrencyFilter.ts";

// CONSTANTS
import strings from "./constants/strings.ts";
import grStatus from "./constants/GRStatus.ts";

const app = createApp(App);
app.use(store);
app.use(router);

//INIT FILTER
app.config.globalProperties.$currencyFilters = currencyFilters
app.config.globalProperties.$filters = filters

app.config.globalProperties.$strings = strings
app.config.globalProperties.$grStatus = grStatus


app.component('base-modal', BaseModal);
app.component('load-widget', LoadWidget);
app.component('custom-alert', CustomAlert);

app.mount("#app");
