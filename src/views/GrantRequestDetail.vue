<template>
  <div class="container">
    <div class="row my-2 align-items-start">
      <div class="col text-start align-middle">
        <router-link
          :to="{name: 'GrantUserDetail', params: {id: user_id}}"
          type="button"
          class="btn btn-primary mx-2"
        >
          <svg
            class="vue-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
              fill="white"
            />
          </svg>
        </router-link>
        <p class="d-inline text-center bold">{{ $strings.GRANT_USER_DETAIL() }}</p>
      </div>
      <div class="col h-100 text-center align-middle">
        <p class="d-inline bold">{{ $strings.GRANT_REQUEST_DETAIL() }}</p>
      </div>
      <div class="col text-end align-middle"></div>
    </div>
    <div class="row my-4">
      <custom-alert :isSuccess="(response.success)" :message="response.message" v-if="response"/>
      <div class="card my-4">
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col">
                <label for="requestDateInp" class="form-label bold">{{ $strings.REQUEST_DATE() }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="123456789"
                  name="requestDateInp"
                  disabled
                  :value="!disabled ? formatDate(request.created_at) : ''"
                />
              </div>
              <div class="col">
                <label for="requestStatusInp" class="form-label bold">{{ $strings.STATUS() }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Granted"
                  name="requestStatusInp"
                  disabled
                  :value="!disabled ? request.status : ''"
                />
              </div>
            </div>
            <div class="row">
              <label for="requestReasonInp" class="form-label bold">{{ $strings.REQUEST_REASON() }}</label>
              <textarea
                class="form-control mx-2"
                id="requestReasonInp"
                name="requestReasonInp"
                rows="3"
                disabled
                :value="!disabled ? request.request_reason : ''"
              >
              </textarea>
            </div>
            <div class="row">
              <div class="col">
                <label for="bankNameInp" class="form-label bold">{{ $strings.BANK_NAME() }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="2021-01-01"
                  name="bankNameInp"
                  disabled
                  :value="!disabled ? request.bank_name : ''"
                />
              </div>
              <div class="col">
                <label for="accountNameInp" class="form-label bold">{{ $strings.ACCOUNT_NAME() }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="-"
                  name="accountNameInp"
                  disabled
                  :value="!disabled ? request.bank_account_name : ''"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label for="accountNumberInp" class="form-label bold">{{ $strings.ACCOUNT_NUMBER() }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="01/01/2021"
                  name="accountNumberInp"
                  disabled
                  :value="!disabled ? request.bank_account_number : ''"
                />
              </div>
              <div class="col">
                <label for="requesterInp" class="form-label bold">{{ $strings.REQUESTER() }}</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="01/01/2021"
                  name="requesterInp"
                  disabled
                  :value="!disabled ? request.requester : ''"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label for="accountNumberInp" class="form-label bold">{{ $strings.PROOF_IMAGES() }}</label>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="imglist-container">
                  <div>
                    <template
                      v-for="imgSrc in request.images_of_proof"
                      :key="imgSrc">
                      <a class="img-link" target="_blank" :href="baseUrl + replacePath(imgSrc)"
                        ><img
                          :src="baseUrl + replacePath(imgSrc)"
                          class="rounded W-100 h-100 mx-2"
                          style="max-width: 150px; max-height: 150px"
                      /></a>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row m-0">
        <div class="col text-end">
          <button
            type="button"
            class="btn btn-danger me-3 px-4"
            @click="didTapRejectButton()">
            거부하다
          </button>

          <button
            @click="updateRequest('MONEY_TRANSFERED')"
            type="button"
            class="btn btn-success text-white">
            <load-widget :loading="true" :color="'#FFFFFF'" :size="'35px'" v-if="isLoading"/>
            <span v-else>송금</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <base-modal :isShow="isModalShow">
    <form enctype="multipart/form-data" v-on:submit.prevent="onSubmit">
      <div class="container-fluid">
        <div class="row mb-5">
          <div class="col-2">&nbsp;</div>
          <div class="col-8">
            <h1 class="text-center">Reject Request</h1>
          </div>
          <div class="col-2 d-flex">
            <button
              class="btn my-auto ms-auto p-0"
              style="line-height: 0rem"
              @click="toggleModal()">
              <img src="@/assets/img/ui/ic_times.svg" alt="" />
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-grid gap-4">
              <div>
                <label for="rejected_reason" class="form-label bold">{{ $strings.REJECT_REASON() }}</label>
                <input
                  id="rejected_reason"
                  type="text"
                  class="form-control"
                  :placeholder="$strings.YOUR_REASON_HERE()"
                  name="rejected_reason"
                  v-model="rejected_reason"/>
              </div>

              <div v-if="!isSubmit">
                <button
                  class="btn btn-primary w-100"
                  @click="updateRequest('REJECT')">
                  {{ $strings.UPDATE() }}
                </button>
              </div>
              <load-widget v-else></load-widget>
            </div>
          </div>
        </div>
      </div>
    </form>
  </base-modal>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      baseUrl: import.meta.env.VITE_BASE_URL,
      action: null,
      rejected_reason: null,
      isModalShow: false,
      isLoading: false,
    };
  },
  computed: {
    request() {
      const request = this.$store.getters["grantRequests/request"];
      return request;
    },
    age() {
      return (birthdate) => {
        const today = new Date();
        const bdate = new Date(birthdate);

        console.log(bdate);

        let age = today.getFullYear() - bdate.getFullYear();
        const month = today.getMonth() - bdate.getMonth();

        //* Same year but today month before the birthday month
        if (month < 0) {
          age = age - 1;
        }
        return age;
      };
    },
    response() {
      this.isLoading = false;
      this.getGrantReqDetail();
      return this.$store.getters["grantRequests/response"];
    },
  },
  props: {
    user_id: {
        type: String,
    },
    request_id: {
        type: String,
    },
  },
  created() {
    this.getGrantReqDetail();
  },
  watch: {
    isSubmit: function () {
      if (!this.isSubmit) {
        (this.rejected_reason = null);
          (this.isModalShow = false);
      }
    },
  },
  methods: {
    getGrantReqDetail(){
      this.$store.dispatch("grantRequests/getRequestDetail", {
        request_id: this.request_id,
      });
    },
    replacePath(path){
      return path.replace("public", "")
    },
    formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
    },
    didTapRejectButton() {
      this.isModalShow = true;
    },
    updateRequest(reqStatus) {
      this.isLoading = true;
      var rejected = this.rejected_reason;

      const payload = {
        id: this.request_id,
        action: reqStatus,
        rejected_reason: rejected,
      };

      this.$store.dispatch("grantRequests/updateRequest", payload);
    },
    toggleModal() {
      this.isModalShow = !this.isModalShow;
    },
  },
};
</script>

<style scoped>
.row {
  margin: 1rem;
}

.modal {
  z-index: 1070 !important;
}

a span {
  color: #023874;
  text-decoration: underline;
}

.imglist-container {
  height: 150px;
  overflow: auto;
  overflow-y: hidden;
  overflow-x: auto;
  width: 62vw;
  /* box-sizing: border-box; */
}
.imglist-container > div {
  display: flex;
}
.img-link {
  display: inline-block;
}
</style>
