<template>
  <transition name="route" appear>
    <div>
      <div class="row">
        <div class="col-lg-12">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2">
            <path d="M13.7143 0C8.03429 0 3.42857 4.72853 3.42857 10.56H0L4.44571 15.1243L4.52571 15.2885L9.14286 10.56H5.71429C5.71429 6.0192 9.29143 2.34667 13.7143 2.34667C18.1371 2.34667 21.7143 6.0192 21.7143 10.56C21.7143 15.1008 18.1371 18.7733 13.7143 18.7733C11.5086 18.7733 9.50857 17.8464 8.06857 16.3563L6.44571 18.0224C8.30857 19.9349 10.8686 21.12 13.7143 21.12C19.3943 21.12 24 16.3915 24 10.56C24 4.72853 19.3943 0 13.7143 0ZM12.5714 5.86667V11.7333L17.4629 14.7136L18.2857 13.2939L14.2857 10.8533V5.86667H12.5714Z" fill="#023366" />
          </svg>
          <h1>대시보드</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <UserRegistrationList />
        </div>
        <div class="col-6">
          <TrustFundsRequest />
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
  import {
    ref
  } from "vue";
  import TrustFundsRequest from "../components/DashboardTab/TrustFundsRequest.vue";
  import UserRegistrationList from "../components/DashboardTab/UserRegistrationList.vue";

  export default {
    components: {
      TrustFundsRequest,
      UserRegistrationList,
    },
    computed: {
      isActive() {
        return val => {
          return this.activeItem === val;
        }
      },
    },
    methods: {
      getAllRegisRequest() {
        this.$store.dispatch('users/getAllRegisRequest', {
          'page': 1,
          'limit': 5,
        });
      },
      getAllGrantRequest() {
        this.$store.dispatch('grantRequests/getAllNewGrantRequest', {
          'page': 1,
          'limit': 5,
        });
      },
    },
    created() {
      this.getAllRegisRequest();
      this.getAllGrantRequest();
    },

    beforeUnmount() {
      this.$store.dispatch('users/reset');
    }
  };
</script>

<style scoped>
  h1 {
    display: inline-block;
  }

  svg {
    margin-top: -0.5rem;
  }
</style>