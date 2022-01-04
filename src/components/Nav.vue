<template>
  <div class="mb-4">
    <img class="img-fluid w-100" src="../assets/img/ui/img_icon.png" />
  </div>
  <ul class="nav nav-pills flex-column align-items-center align-items-sm-start">
    <li v-for="sidebarMenu in sidebarMenus" :key="sidebarMenu" class="nav-item w-100">
      <router-link :to="{name: sidebarMenu.name}" class="sidebar-item-link nav-link py-4" :class="{active: currentRoute == sidebarMenu.name}">
        <div class="sidebar-item-content d-flex">
          <div class="d-flex me-3" style="width: 17px;">
            <img class="m-auto" :src="sidebarMenu.icon" alt="" style="height: 17px;">
          </div>
          <p style="line-height:1">{{ sidebarMenu.title }}</p>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <a class="sidebar-item-link nav-link py-4" @click="logout">
        <div class="sidebar-item-content d-flex">
          <div class="d-flex me-3" style="width: 17px;">
            <img class="m-auto" src="../assets/img/ui/ic_logout.svg" alt="" style="height: 17px;">
          </div>
          <p style="line-height:1">로그아웃</p>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
  import DashboardIcon from '@/assets/img/ui/ic_dashboard.svg';
  import UsersIcon from '@/assets/img/ui/ic_users.svg';
  import GrantRequestIcon from '@/assets/img/ui/ic_grant_request.svg';
  import AppManagementIcon from '@/assets/img/ui/ic_app_management.svg';
  import MessagingIcon from '@/assets/img/ui/ic_messaging.svg';

  export default {
    data() {
      return {
        sidebarMenus: [{
            icon: DashboardIcon,
            name: 'Dashboard',
            title: "대시보드"
          },
          {
            icon: UsersIcon,
            name: 'Users',
            title: "사용자 관리"
          },
          {
            icon: GrantRequestIcon,
            name: 'GrantRequest',
            title: "승인 요청"
          },
          {
            icon: AppManagementIcon,
            name: 'AppManagement',
            title: "앱 관리"
          },
          {
            icon: MessagingIcon,
            name: 'Messaging',
            title: "메시징"
          },
          // { icon: 'ic_logout.svg', name: '', title: "Logout" },
        ],
      }
    },
    computed: {
      currentRoute() {
        return this.$route.matched[0].name;
      }
    },
    created() {
      console.log(this.route);
    },
    methods: {
      logout() {
        this.$store.dispatch('auth/logout');
        return this.$router.replace({
          name: 'Login'
        });
      }
    },
  };
</script>

<style scoped lang="scss">
  .sidebar-item-link {
    &.active {
      .sidebar-item-content {
        opacity: 1;
      }
    }

    .sidebar-item-content {
      opacity: 0.25;

      p {
        font-size: 16px;
      }
    }
  }


  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul li a.active {
    color: #000;
    text-decoration: none;
  }

  a svg {
    opacity: 0.25;
  }

  a.active svg {
    opacity: 1;
  }

  .vue-icon {
    margin-right: 10px;
    margin-bottom: 2px
  }
</style>