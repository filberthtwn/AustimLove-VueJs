import { createRouter, createWebHistory } from "vue-router";
import NotFound404 from "/src/views/NotFound404.vue";

import Dashboard from "/src/views/Dashboard.vue";
import Messaging from "/src/views/messaging/MessagingView.vue";

import GrantRequest from "/src/views/grantrequest_views/GrantRequestList.vue";
import Login from "/src/views/auth/Login.vue";
import UserDetail from "/src/views/UserDetail.vue";

import User from "/src/views/users_views/User.vue";
import RegisRequest from "/src/views/users_views/RegisRequest.vue";
import UserList from "/src/views/users_views/UserList.vue";
import Connections from "/src/views/users_views/Connections.vue";

import AppManagement from "/src/views/app_management/AppManagement.vue";
import Transactions from "/src/views/app_management/Transactions.vue";
import PushNotification from "/src/views/app_management/PushNotification.vue";
import Announcements from "/src/views/app_management/Announcements.vue";
import PopupManager from "/src/views/app_management/PopupManager.vue";

// import RegisRequest from "/src/views/users_views/RegisRequest.vue";
// import UserList from "/src/views/users_views/UserList.vue";
// import Connections from "/src/views/users_views/Connections.vue";

//* User Detail Section
import UserInfo from "/src/views/user_detail/UserInfo.vue";
import BalanceHistory from "/src/views/user_detail/BalanceHistory.vue";

import VolunteerDetail from "/src/views/VolunteerDetail.vue";
import SupportAgentDetail from "/src/views/SupportAgentDetail.vue";
import GrantUserDetail from "/src/views/GrantUserDetail.vue";
import ConnectionDetail from "/src/views/ConnectionDetail.vue";
import GrantRequestDetail from "/src/views/GrantRequestDetail.vue";

import TermPrivate from "/src/views/terms/TermPrivate.vue";
import TermService from "/src/views/terms/TermService.vue";


//* Grant Request Section
const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      layout: "DashboardLayout",
    },
  },
  {
    path: "/messaging",
    name: "Messaging",
    component: Messaging,
    meta: {
      layout: "DashboardLayout",
    },
  },
  {
    path: "/users",
    name:"Users",
    component: User,
    redirect: {
      name: 'RegisRequests'
    },
    children: [
      {
        path: "regis",
        name: "RegisRequests",
        component: RegisRequest,
        meta: {
          layout: "DashboardLayout",
        },
      },
      {
        path: "user-list",
        name: "UserList",
        component: UserList,
        meta: {
          layout: "DashboardLayout",
        },
      },
      {
        path: "connections",
        name: "Connections",
        component: Connections,
        meta: {
          layout: "DashboardLayout",
        },
      },
    ]
  },
  {
    path: "/grantrequest",
    name: "GrantRequest",
    component: GrantRequest,
    meta: {
      layout: "DashboardLayout",
    },
  },
  // APP MANAGEMENT
  {
    path: "/appmanagement",
    name: "AppManagement",
    component: AppManagement,
    redirect: {
      name: 'Transactions'
    },
    children: [
      {
        path: "transactions",
        name: "Transactions",
        component: Transactions,
        meta: {
          layout: "DashboardLayout",
        },
      },
      {
        path: "push-notif",
        name: "PushNotif",
        component: PushNotification,
        meta: {
          layout: "DashboardLayout",
        },
      },
      {
        path: "announcements",
        name: "Announcements",
        component: Announcements,
        meta: {
          layout: "DashboardLayout",
        },
      },
      {
        path: "popup-manager",
        name: "PopupManager",
        component: PopupManager,
        meta: {
          layout: "DashboardLayout",
        },
      },
    ]
  },

  {
    path: "/user-detail/:id/detail",
    name: "UserDetail",
    component: UserDetail,
    meta: {
      layout: "DashboardLayout",
    },
    props: true,
  },
  {
    path: "/user-detail/:id",
    component: UserInfo,
    meta: {
      layout: "DashboardLayout",
    },
    props: true,
    children:[
      {
        path: "user-info",
        name: "UserInfo",
        component: UserInfo,
      },
      // {
      //   path: "balance-history",
      //   name: "BalanceHistory",
      //   component: BalanceHistory,
      // }
    ]
  },
  {
    path: "/user-detail/:id/balance-history",
    name: "BalanceHistory",
    component: BalanceHistory,
    meta: {
      layout: "DashboardLayout",
    },
    props: true,
  },
  {
    path: "/volunteerdetail",
    name: "VolunteerDetail",
    component: VolunteerDetail,
    meta: {
      layout: "DashboardLayout",
    },
  },
  {
    path: "/supportagentdetail",
    name: "SupportAgentDetail",
    component: SupportAgentDetail,
    meta: {
      layout: "DashboardLayout",
    },
  },
  {
    path: "/grantrequest/:id",
    name: "GrantUserDetail",
    component: GrantUserDetail,
    meta: {
      layout: "DashboardLayout",
    },
    props: true,
  },
  {
    path: "/grantrequest/:user_id/grantrequestdetail/:request_id",
    name: "GrantRequestDetail",
    component: GrantRequestDetail,
    meta: {
      layout: "DashboardLayout",
    },
    props: true,
  },
  {
    path: "/connectiondetail/:id",
    name: "ConnectionDetail",
    component: ConnectionDetail,
    meta: {
      layout: "DashboardLayout",
    },
    props: true,
  },
  {
    path: "/term/private",
    name: "TermPrivate",
    component: TermPrivate,
    meta: {
      layout: "TermsLayout",
    },
    props: true,
  },
  {
    path: "/term/service",
    name: "TermService",
    component: TermService,
    meta: {
      layout: "TermsLayout",
    },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function(to, from, next){
  if (to.name !== 'Login' && to.name !== 'TermPrivate' && to.name !== 'TermService'){
    if (!localStorage.getItem('token')){
      next({ name: 'Login' })
      return
    }
  }
  next()
});

export default router;
