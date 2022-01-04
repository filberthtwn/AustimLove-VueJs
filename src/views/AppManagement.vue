<template>
<div>

  <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="setActive('transactions')"
          :class="{ active: isActive('transactions') }"
          ><span>Transactions</span></a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="setActive('push-notifications')"
          :class="{ active: isActive('push-notifications') }"
          ><span>Push Notifications</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="setActive('announcement')"
          :class="{ active: isActive('announcement') }"
          ><span>Announcement</span>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
           @click.prevent="setActive('popup-manage')"
          :class="{ active: isActive('popup-manage') }"
          ><span>Popup Manager</span>
        </a>
      </li>
  </ul>

  <div class="tab-content py-3" id="myTabContent">
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('transactions') }"
        id="transactions">
        <TransactionTable />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('push-notifications') }"
        id="push-notifications">
        <PushNotifTable />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('announcement') }"
        id="announcement">
        <AnnouncementTable />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('popup-manage') }"
        id="popup-manage">
        <PopupManageTable />
      </div>
    </div>
</div>
</template>

<style>
    .tab-list{
      background-color: transparent !important;
      border: 0px !important;
      border-radius: 0px !important;
      margin-right: 1.5rem; 
    }
</style>

<script>
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import TransactionTable from "../components/AppManageTab/TransactionTable.vue";
import PushNotifTable from "../components/AppManageTab/PushNotifTable.vue";
import AnnouncementTable from "../components/AppManageTab/AnnouncementTable.vue";
import PopupManageTable from "../components/AppManageTab/PopupManageTable.vue";

export default {
  components: {
    TransactionTable,
    PushNotifTable,
    AnnouncementTable,
    PopupManageTable
  },
  data() {
    return {
      activeItem: ref("transactions"),
    }
  },
  computed: {
    isActive(){
      return val => {
        return this.activeItem === val;
      }
    },
  },
  methods: {
    // getAllNotification(){
    //   this.$store.dispatch('notifications/getAllNotification');
    // },
    loadAnnouncements(){
      this.$store.dispatch('announcements/loadAnnouncements');
    },
    getAllPopup(){
      this.$store.dispatch('popups/getAllPopups');
    },
    setActive(val) {
      // this.$store.commit('users/setUsers', []);

      switch (val) {
        case 'transactions':
          // this.getAllRegisRequest()
          break;
        case 'push-notifications':
          // this.$store.commit('users/setRegisRequests', []);
          // this.getAllNotification();
          break;
        case 'announcement':
          // this.$store.commit('users/setUsers', []);
          // this.loadAnnouncements();
          break;
        case 'popup-manage':
          // this.$store.commit('users/setUsers', []);
          // this.getAllPopup();
          break;
        default:
          break;
      }
      this.activeItem = val;
    },
  },
  created() {
    // this.getAllRegisRequest();
  },
};
</script>
