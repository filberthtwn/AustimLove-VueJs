<template>
  <div>
    <div class="p-3 mb-2 bg-danger text-white rounded" v-if="errMsg">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mx-2"
      >
        <circle cx="16" cy="16" r="15.5" stroke="white" />
        <path
          d="M14.731 17.636H16.363L16.72 11.363L16.805 9H14.289L14.374 11.363L14.731 17.636ZM15.547 22.158C16.431 22.158 17.111 21.444 17.111 20.526C17.111 19.591 16.431 18.894 15.547 18.894C14.663 18.894 14 19.591 14 20.526C14 21.444 14.663 22.158 15.547 22.158Z"
          fill="white"
        />
      </svg>
      {{ errMsg }}
    </div>
    <div class="card rounded">
      <div class="card-body p-4">
        <div class="text-center mb-3">
          <img
            src="@/assets/img/healstation.png"
            alt="logo"
            class="img-fluid"
          />
        </div>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="mb-2 text-muted lb-sm" for="email">아이디</label>
            <input class="form-control" placeholder="아이디" v-model="email" />
          </div>

          <div class="mb-3">
            <div class="mb-2 w-100">
              <label class="text-muted lb-sm" for="password">비밀번호</label>
            </div>
            <input type="password" class="form-control" placeholder="비밀번호" v-model="password" />
          </div>

          <div class="d-flex align-items-center bold mt-4 mb-4">
            <clip-loader class="mx-auto" :loading="isSubmit" :color="color" :size="size" v-if="isSubmit"></clip-loader>
            <button type="submit" class="btn btn-primary w-100 p-2" v-else @click="login">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue"
import axios from "axios";
import LoginError from "../../components/LoginError.vue";
import firebase from '../../../firebaseConfig.js';

export default {
  components: {
    LoginError,
    ClipLoader
  },
  props: {
    size: {
      default: '40px'
    },
    color: {
      default: '#023366'
    },
  },
  data() {
    return {
      errMsg: null,
      email: null,
      password: '',
    }
  },
  computed: {
    isSubmit() {
      return this.$store.getters['auth/isSubmit'];
    },
    errMsg() {
      return this.$store.getters['auth/errMsg'];
    },
  },
  watch:{
    isSubmit(){
       if (!this.isSubmit){
         this.$router.push("/");
       };
    }
  },
  methods: {
    login() {
      const messaging = firebase.messaging();
      messaging.getToken({
        vapidKey: "BAwJ52_I-D32I-ICkjg5dDOB47vDRbEdcAS8fTNOXJVin0FkXKu7rv8vrrxOQQIo_77spv_8de_rZTkuw5rG2T8"
      }).then((currentToken) => {
        console.log("FCM TOKEN: ", currentToken);
        if (currentToken) {
          this.$store.dispatch('auth/login',{
            email: this.email,
            password: this.password,
            fcm_token: currentToken
          });
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });;
    },
  },
};
</script>

<style scoped>

.form-control {
  border: 0;
  border-bottom: 0.5px solid #02326677;
  border-radius: 0;
}

input:focus {
  outline: 0;
}

.bg-danger {
  background: #FF6767;
}

</style>
