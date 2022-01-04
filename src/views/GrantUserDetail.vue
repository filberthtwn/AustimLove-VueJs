<template>
  <div class="container">
    <div class="row my-2 align-items-start">
      <div class="col text-start align-middle">
        <button
          type="button"
          @click="backToGrantRequest"
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
        </button>
        <p class="d-inline text-center bold">회원별 요청 보기</p>
      </div>
    </div>
    <div class="row my-4">
      <div class="card rounded-3 my-4">
        <div class="card-body py-4">
          <div class="row">
            <div class="col-3">
              <p class="bold">{{ $strings.ID() }}</p>
              <p>{{ grantUser.email }}</p>
            </div>
            <div class="col-3">
              <p class="bold">성명</p>
              <p>{{ grantUser.name }}</p>
            </div>
            <div class="col-3">
              <p class="bold">연락처</p>
              <p>{{ grantUser.phoneNumber }}</p>
            </div>
            <div class="col-3">
              <p class="bold">생년월일</p>
              <p>
                {{ grantUser.birthdate }} ({{ age(grantUser.birthdate) }} years)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="row">
        <div class="col-6">
          <p class="bold">{{ $strings.GRANT_REQUEST_LIST() }}</p>
        </div>
        <div class="col-6 text-end">
          <div class="btn btn-primary me-3 px-4">
            <a style="text-decoration: none; color: white;" :href="'' + item.path" @click.prevent="getGrantRequestDownloadLink" download>
              다운로드
            <svg
              class="ms-2"
              width="24"
              height="16"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.35 6.04C18.67 2.59 15.64 0 12 0C9.11 0 6.6 1.64 5.35 4.04C2.34 4.36 0 6.91 0 10C0 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM17 9L12 14L7 9H10V5H14V9H17Z"
                fill="white"
              />
            </svg>
            </a>
            
          </div>
        </div>
      </div>

      <div class="card my-4">
        <div class="card-body">
          <table class="table regis-table">
            <thead>
              <tr>
                <th scope="col"><p class="bold">일시</p></th>
                <th scope="col"><p class="bold">요청 내용</p></th>
                <th scope="col"><p class="bold">상태</p></th>
                <th scope="col"><p class="bold">관리</p></th>
              </tr>
            </thead>
            <!-- SHIMMER CONTENT -->
            <shimmer-cell :column="4" :row="3" v-if="!isDataLoaded" />
            <!-- END SHIMMER CONTENT -->
            <tbody v-else>
              <tr v-for="request in requests" :key="request">
                <th class="align-middle" scope="row">
                  {{ formatDate(request.created_at) }}
                </th>
                <td class="align-middle">
                  {{ request.request_reason }}
                </td>
                <td
                  v-if="request.status == 'WAITING'"
                  class="align-middle text-warning bold">
                  {{ $grStatus.WAITING() }}
                </td>
                <td
                  v-if="request.status == 'REJECT'"
                  class="align-middle text-danger bold">
                  {{ $grStatus.REJECTED() }}
                </td>
                <td
                  v-if="request.status == 'ACCEPT'"
                  class="align-middle text-success bold">
                  {{ $grStatus.APPROVED() }}
                </td>
                <td
                  v-if="request.status == 'MONEY_TRANSFERED'"
                  class="align-middle text-primary bold">
                  {{ $grStatus.MONEY_TRANSFERED() }}
                </td>
                <td
                  v-if="request.status == 'NO PROOF'"
                  class="align-middle bold">
                  {{ request.status }}
                </td>
                <td class="align-middle">
                  <div class="d-grid gap-2 d-md-block">
                    <router-link
                      :to="{
                        name: 'GrantRequestDetail',
                        params: {
                          user_id: grantUser.id,
                          request_id: request.id,
                        },
                      }"
                    >
                      <div class="btn btn-primary mx-2 text-white">{{ $strings.DETAILS() }}</div>
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <pagination
    :currentPage="currentPage"
    :totalPage="Math.ceil(totalValue / limit)"
    :callback="movePage"
  />
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
import ShimmerCell from "../components/ShimmerCell.vue";
import Pagination from "../components/Pagination.vue";

export default {
  components: {
    "shimmer-cell": ShimmerCell,
    pagination: Pagination,
  },
  data() {
    return {
      limit: 5,
      currentPage: 1,
    };
  },

  watch: {
    id(){
      this.getUserDetail();
      this.getAllRequest();
    }
  },
  props: {
    isDataLoaded: false,
  },
  computed: {
    grantUser() {
      const grantUser = this.$store.getters["grantRequests/grantUser"];
      return grantUser;
    },
    item() {
      const item = this.$store.getters["grantRequests/downloadedItem"];
      return item;
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
    requests() {
      return this.$store.getters["grantRequests/requests"];
    },
    isDataLoaded: function () {
      return this.$store.getters["grantRequests/isDataLoaded"];
    },
    totalValue: function () {
      return this.$store.getters["grantRequests/totalValue"];
    },
  },
  created() {
    this.getUserDetail();
    this.getAllRequest();
    this.$store.dispatch("grantRequests/getGrantRequestDownloadLink", {
      id: this.id,
    });
  },
  methods: {
    getUserDetail(){
      this.$store.dispatch("grantRequests/getGrantUserDetail", {
            id: this.id,
      });
    },
    getAllRequest() {
      const payload = {
        user_id: this.id,
        limit: this.limit,
        page: this.currentPage,
      };
      this.$store.dispatch("grantRequests/getAllRequest", payload);
    },
    formatDate(dateString) {
      return moment(dateString).format("YYYY-MM-DD HH:mm:ss");
    },
    movePage(page) {
      this.currentPage = page;
      this.getAllRequest();
    },
  },
  setup(props, context) {
    const router = useRouter();

    const backToGrantRequest = () => {
      router.push("/grantrequest");
    };

    const grantRequestDetail = () => {
      router.push("/grantrequestdetail");
    };

    return {
      backToGrantRequest,
      grantRequestDetail,
    };
  },
  props: ["id"],
};
</script>
