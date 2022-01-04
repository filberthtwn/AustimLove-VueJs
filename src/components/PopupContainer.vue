<template>
    <div class="popup-container shadow-lg position-relative">
      <router-link 
      class="decoration-none h-100" 
      :to="{name: 'Messaging'}"
      @click="setupSelectedRoomId">
        <div class="p-3 h-100">
          <div class="h-100 overflow-hidden">
            <div class="d-flex mb-2">
              <p class="fw-bold my-auto me-4 w-100">
                {{ popup.title }}
              </p>
            </div>
            <p class="popup-desc">
              {{ popup.body }}
            </p>
          </div>
        </div>
      </router-link>
      <button class="btn p-0 ms-auto position-absolute" style="top: 1rem; right: 1rem; z-index: 90; height: 16px; line-height: 0px;" @click="removeItem">
        <img src="@/assets/img/ui/ic_times.svg" alt="" width="16" height="16">
      </button>
    </div>
</template>

<script>
    export default {
        props: {
            popup: {
              type: Object
            },
            removeCallback: {
              type: Function
            },
        },
        methods: {
          removeItem(){
            this.removeCallback(this.popup);
          },
          
          setupSelectedRoomId(){
            this.$store.dispatch('messaging/setSelectedroomId',{
              roomId: this.popup.data.room_id
            });

            this.removeCallback(this.popup)
          }
        }
    }
</script>