<template>
  <div>
    <base-modal :isShow="isModalShow">
      <div class="container-fluid">
        <div class="row gap-4 mx-2" v-if="!showConfirmation">
          <div class="col-12">
            <div class="d-flex justify-content-between">
              <div/>
              <h1 class="text-center">관리자 계정</h1>
              <div>
                  <button class="btn my-auto p-0" @click="toggleModal()" style="height:21px; width:21px; line-height:1">
                      <img src="@/assets/img/ui/ic_times.svg" alt="">
                  </button>
              </div>
            </div>
          </div>
          
          <div class="col-12" v-if="message">
            <custom-alert :isSuccess="(successMsg)" :message="message"/>
          </div>

          <div class="col-12">
            <label for="push_title" class="form-label bold">아이디</label>
            <input id="push_title" type="text" class="form-control" v-model="currentUser.email" disabled />
          </div>
          <div class="col-12">
            <label class="form-label bold">현재 비밀번호</label>
            <input type="password" class="form-control" placeholder="Enter your old password" autocomplete="off" v-model="oldPassword"/>
          </div>
          <div class="col-12">
            <label class="form-label bold">새 비밀번호</label>
            <input id="push_title" type="password" class="form-control" placeholder="Enter your new password" autocomplete="off" v-model="newPassword"/>
          </div>
          <div class="col-12">
            <label class="form-label bold">새 비밀번호 확인</label>
            <input type="password" class="form-control" placeholder="Re-enter your new password" autocomplete="off" v-model="confirmPassword"/>
          </div>
          <div class="col-12">
            <button class="btn btn-primary w-100" @click="toggleConfirmation()">
              변경
            </button>
          </div>
        </div>

        <div id="confirmation-d" v-else>
            <div class="d-flex flex-column p-3" v-if="!isLoading">
                <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
                <div class="d-flex mx-auto gap-3">
                    <button class="btn btn-outline-primary" style="width: 150px" @click="toggleConfirmation()">
                        {{ $strings.NO() }}
                    </button>
                    <button class="btn btn-primary" style="width: 150px" @click="confirmAction()">
                        {{ $strings.YES() }}
                    </button>
                </div>
            </div>
            <load-widget :loading="true"  :size="'72px'" v-else/>
        </div>
      </div>
    </base-modal>

    <div class="container-fluid position-relative h-100" style="overflow:hidden">
      <div class="popup-frame-container position-absolute">
        <PopupContainer
        v-for="(val, idx) in popups" 
        :key="idx" 
        :popup="val" 
        :removeCallback="removePopup" />
      </div>
      
      <div class="row flex-nowrap">
        <div class="sidebar col-auto col-md-3 position-fixed side-panel p-4" >
          <Nav />
        </div>
        <div class="col d-flex flex-column offset-3 py-5 px-4 my-3 overflow-scroll" style="height: 100vh">
          <TopNavBar :didTapProfileIcon="didTapProfileIcon" />
          <slot />
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
  import Nav from "../components/Nav.vue";
  import TopNavBar from "../components/TopNavBar.vue";
  import BaseModal from '../components/Widgets/BaseModal.vue';
  import PopupContainer from '../components/PopupContainer.vue';
  import firebase from '../../firebaseConfig.js';

  export default {
    name: "App",

    components: {
      Nav,
      TopNavBar,
      BaseModal,
      PopupContainer
    },

    data() {
      return {
        message: null,
        isModalShow:false,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        showConfirmation: false,
        isLoading: false,
        popups: []
      }
    },

    computed:{
      currentUser() {         
        return JSON.parse(localStorage.getItem('userDetail'));
      },
      isSubmit() {
        return this.$store.getters['auth/isSubmit'];
      },
      successMsg(){
        return this.$store.getters['auth/successMsg'];
      },
      errMsg() {
        return this.$store.getters['auth/errMsg'];
      },
      isUpdateNotif() {
        return this.$store.getters['notifications/isUpdateNotif'];
      }
    },

    watch: {
      successMsg(){
        if (this.successMsg != null) this.message = this.successMsg;

        this.isLoading = false;
        this.showConfirmation = false;
      },
      errMsg(){
        if (this.errMsg != null) this.message = this.errMsg;

        this.isLoading = false;
        this.showConfirmation = false;
      },
      isUpdateNotif() {
        if(this.isUpdateNotif){
          this.$store.dispatch('notifications/getAllAdminNotification', null);
        }
      }
    },

    methods: {
      didTapProfileIcon() {
        this.isModalShow = true;
      },

      toggleModal(){
        this.message = null;
        this.oldPassword = null;
        this.newPassword = null;
        this.confirmPassword = null;
        this.isModalShow = !this.isModalShow;
      },

      toggleConfirmation(){
        if (this.oldPassword == '' || this.newPassword == '' || this.confirmPassword == ''){
          this.message = 'Please fill the blanks!';
          return;
        }
        this.showConfirmation = !this.showConfirmation;
      },

      confirmAction(){
        this.message = null;

        if (this.newPassword !== this.confirmPassword){
          this.message = "Password not match"; 
          return;
        }

        this.isLoading = true;

        this.$store.dispatch('auth/changePassword',{
          'old_password': this.oldPassword,
          'new_password': this.newPassword,
        });
      },

      removePopup(index){
        this.popups.splice(index, 1);
      },

      getAllAdminNotification(){
        this.$store.dispatch('notifications/listenNewNotification', null);
        this.$store.dispatch('notifications/getAllAdminNotification', null);
      }
    },

    beforeUnmount() {
        this.$store.dispatch('auth/reset');
    },

    created() {
      // const messaging = firebase.messaging();
      // messaging.onMessage((payload) => {
      //   const notification = {
      //     title: payload.notification.title,
      //     body: payload.notification.body,
      //     data: payload.data
      //   }
      //   this.popups.unshift(notification)
      // });
      this.getAllAdminNotification();
    }
  };
</script>