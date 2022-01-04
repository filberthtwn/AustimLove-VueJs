<template>
  <div>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="setActive('regis')"
          :class="{ active: isActive('regis') }"
          href="#regis"
          ><span>Registrations</span></a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="setActive('users')"
          :class="{ active: isActive('users') }"
          href="#users"
          ><span>Users</span></a
        >
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          @click.prevent="setActive('conn')"
          :class="{ active: isActive('conn') }"
          href="#conn"
          ><span>Connections</span></a
        >
      </li>
    </ul>
    <div class="tab-content py-3" id="myTabContent">
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('regis') }"
        id="regis"
      >
        <RegistrationTable />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('users') }"
        id="users"
      >
        <!-- insert here -->

        <UsersTable />
      </div>
      <div
        class="tab-pane fade"
        :class="{ 'active show': isActive('conn') }"
        id="conn"
      >
        <!-- insert here -->

        <ConnectionsTable />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Form1 from "../forms/Form1.vue";
import Form2 from "../forms/Form2.vue";
import RegistrationTable from "../components/UsersTab/RegistrationTable.vue";
import UsersTable from "../components/UsersTab/UsersTable.vue";
import ConnectionsTable from "../components/UsersTab/ConnectionsTable.vue";

export default {
  components: {
    Form1,
    Form2,
    RegistrationTable,
    UsersTable,
    ConnectionsTable,
  },
  data() {
    return {
      activeItem: ref("regis"),
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
    getAllUser(role){
      this.$store.dispatch('users/getAllUser', {'role': role});
    },

    getAllRegisRequest(role){
      this.$store.dispatch('users/getAllRegisRequest', {
        'page': 1,
        'limit': 10,
      });
    },

    setActive(val) {
      this.$store.commit('users/setRegisRequests', []);
      this.$store.commit('users/setUsers', []);

      switch (val) {
        case 'regis':
          this.getAllRegisRequest()
          break;
        case 'users':
          this.getAllUser();
          break;
        case 'conn':
          this.getAllUser('USER');
          break;
        default:
          break;
      }
      this.activeItem = val;
    },
  },
  created() {
    this.getAllRegisRequest();
  },
};
</script>
