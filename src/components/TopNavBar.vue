<template>
  <nav class="navbar-nav me-auto d-flex mb-4 w-100">
    <div class="d-flex ms-auto">
      <button class="btn p-0 navbar-brand" @click="didTapProfileIcon"
        ><svg
          width="34"
          height="39"
          viewBox="0 0 34 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.2142 10.0267C25.2142 4.9629 21.1092 0.85791 16.0455 0.85791C10.9817 0.85791 6.87671 4.9629 6.87671 10.0267C6.87671 15.0904 10.9817 19.1954 16.0455 19.1954C21.1092 19.1954 25.2142 15.0904 25.2142 10.0267Z"
            fill="#023366"
          />
          <path
            d="M31.6999 34.1621C31.6895 30.5814 30.2625 27.1502 27.7305 24.6183C25.1985 22.0863 21.7674 20.6593 18.1867 20.6489H13.7707C10.19 20.6593 6.75889 22.0863 4.22692 24.6183C1.69494 27.1502 0.267916 30.5814 0.257568 34.1621C0.257568 34.3848 0.301408 34.6053 0.386629 34.8111C0.47185 35.0168 0.596771 35.2037 0.754238 35.3612C0.911706 35.5187 1.09864 35.6436 1.30438 35.7288C1.51013 35.814 1.73066 35.8579 1.95335 35.8579H30.0041C30.4538 35.8579 30.8852 35.6792 31.2032 35.3612C31.5212 35.0432 31.6999 34.6118 31.6999 34.1621Z"
            fill="#023366"
          />
          <circle cx="24.5" cy="29.5" r="9.5" fill="#F7F8FA" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M30.451 29.6336C30.451 32.8231 27.8654 35.4086 24.6759 35.4086C21.4865 35.4086 18.9009 32.8231 18.9009 29.6336C18.9009 26.4441 21.4865 23.8586 24.6759 23.8586C27.8654 23.8586 30.451 26.4441 30.451 29.6336ZM27.9966 29.6337C27.9966 31.4909 26.4911 32.9964 24.6339 32.9964C22.7767 32.9964 21.2712 31.4909 21.2712 29.6337C21.2712 27.7765 22.7767 26.271 24.6339 26.271C26.4911 26.271 27.9966 27.7765 27.9966 29.6337Z"
            fill="#FABA00"
          />
          <path d="M25.8052 22H23.4656V25.7188H25.8052V22Z" fill="#FABA00" />
          <path
            d="M20.0643 23.409L18.4099 25.0634L21.0395 27.693L22.6939 26.0386L20.0643 23.409Z"
            fill="#FABA00"
          />
          <path d="M17 28.4653V30.8049H20.7188V28.4653H17Z" fill="#FABA00" />
          <path
            d="M18.4091 34.2048L20.0635 35.8592L22.693 33.2296L21.0386 31.5752L18.4091 34.2048Z"
            fill="#FABA00"
          />
          <path
            d="M23.4655 37.2688H25.8052V33.55H23.4655V37.2688Z"
            fill="#FABA00"
          />
          <path
            d="M29.2064 35.8598L30.8608 34.2054L28.2313 31.5758L26.5769 33.2302L29.2064 35.8598Z"
            fill="#FABA00"
          />
          <path
            d="M32.269 30.8049V28.4653H28.5503V30.8049H32.269Z"
            fill="#FABA00"
          />
          <path
            d="M30.86 25.064L29.2056 23.4096L26.576 26.0391L28.2304 27.6935L30.86 25.064Z"
            fill="#FABA00"
          />
          <path
            d="M24.6352 30.7396C25.2452 30.7396 25.7396 30.2451 25.7396 29.6352C25.7396 29.0252 25.2452 28.5307 24.6352 28.5307C24.0252 28.5307 23.5308 29.0252 23.5308 29.6352C23.5308 30.2451 24.0252 30.7396 24.6352 30.7396Z"
            fill="#FABA00"
          />
        </svg>
      </button>

      <div class="position-relative me-4">
        <button class="btn m-auto p-0" style="line-height: 1.5;" @click="notifToggle()">
          <div class="position-relative">
            <img src="@/assets/img/ui/ic_bell.svg" alt="" style="width: 36px; height: 36px;">
            <div class="position-absolute bg-danger px-2" style="height: 24px; min-width: 24px; top: -9px; right: -9px; border-radius: 12px;">
              <p class="text-center text-white ">{{ adminNotifications.length }}</p>
            </div>
          </div>
        </button>
        
        <div class="position-absolute" :class="{'d-none': !isShowNotif}" style="top:52px; right:0px; width: 350px; z-index:999;">
          <div class="shadow overflow-auto bg-white" style="height:500px;">
            <div class="d-flex w-100 h-100" v-if="adminNotifications.length == 0">
              <p class="m-auto">No New Notification</p>
            </div>
            <button class="btn text-start" 
            style="border-radius: 0px; line-height: 1.75" 
            v-for="adminNotification in adminNotifications" :key="adminNotification"
            @click="onClickNotif(adminNotification)">
                <div class="border-bottom py-4 mx-3" >
                  <p><b>{{ adminNotification.title }}</b></p>
                  <p class="popup-desc mb-2">
                    {{ adminNotification.body }}
                  </p>
                  <div class="d-flex">
                    <img src="" alt="">
                    <p>{{ $filters.formatDate(adminNotification.createdAt, 'yyyy-MM-DD HH:mm:ss') }}</p>
                  </div>
                </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isShowNotif: false
    }
  },
  computed: {
    adminNotifications() {
        return this.$store.getters['notifications/adminNotifications'];
    },
  },
  methods:{
    notifToggle(){
      this.isShowNotif = !this.isShowNotif;
    },

   async onClickNotif(adminNotification) {
      this.$store.dispatch('notifications/updateAdminNotification', {
        id: adminNotification._id,
        is_read: true
      });
  
      switch (adminNotification.type) {
        case 'REGISTER_REQUEST':
          this.$router.replace({ name: "RegisRequests"})
          break;
        case 'GRANT_REQUEST':
          this.$router.push({ name: "GrantRequestDetail", params: {
            user_id: adminNotification.data.requester_id,
            request_id: adminNotification.data.grant_request_id,
          }})
          break;
        case 'CHAT':
          await this.$store.dispatch('messaging/setSelectedroomId',{
            roomId: adminNotification.data.room_id 
          });
          this.$router.push({ name: "Messaging" })
          break;
        default:
          break;
      }
    }
  },
  props:{
    didTapProfileIcon: {
      type: Function
    }
  },
}
</script>
