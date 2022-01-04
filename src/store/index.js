import { createStore } from "vuex";
import authModule from "./modules/auth/index.js";
import usersModule from "./modules/users/index.js";
import transactionsModule from "./modules/transactions/index.js";
import announcementsModule from "./modules/announcements/index.js";
import notificationsModule from "./modules/notifications/index.js";
import popupsModule from "./modules/popups/index.js";
import grantRequestsModule from "./modules/grantrequests/index.js";
import messaging from "./modules/messaging/index.js";

export default createStore({
  namespaced: true,
  modules: {
    auth: authModule,
    users: usersModule,
    transactions: transactionsModule,
    announcements: announcementsModule,
    notifications: notificationsModule,
    popups: popupsModule,
    grantRequests: grantRequestsModule,
    messaging: messaging,
  },
  state() {
    return {
      baseUrl: "https://api.autismtrust.net",
    }
  },
  getters: {
    baseUrl(state) {
      return state.baseUrl;
    },
  },
});
