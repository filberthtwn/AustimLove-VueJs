<template>
  <div class="card my-4">
    <div class="card-body">
      <div class="row my-2 mb-4">
        <div class="col-12">
          <form class="d-flex">
            <input
              class="form-control rounded-pill me-2 w-25"
              type="search"
              placeholder="검색"
              aria-label="Search"
              v-model="searchQuery"
              @input="onSearch"
            />
          </form>
        </div>
        <div class="col-8 ms-auto">
            <div class="dropdown d-flex justify-content-end">
                <button class="btn btn-secondary dropdown-toggle py-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>{{ $strings.SORT_BY() + ': ' + sortTitle }}</span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#" @click="sorting('date')">{{ $strings.LATEST() }}</a></li>
                    <li><a class="dropdown-item" href="#" @click="sorting('name')">{{ $strings.USERNAME() }}</a></li>
                </ul>
            </div>
        </div>
      </div>
      <table class="table regis-table">
        <thead>
          <tr>
            <th scope="col"><p class="bold">아이디</p></th>
            <th scope="col"><p class="bold">성명</p></th>
            <th scope="col"><p class="bold">연락처</p></th>
            <th scope="col"><p class="bold">생년월일</p></th>
            <th scope="col"><p class="bold">상세보기</p></th>
          </tr>
        </thead>

        <!-- SHIMMER CONTENT -->
        <shimmer-cell :column="5" :row="4" v-if="!isDataLoaded" />
        <!-- END SHIMMER CONTENT -->

        <tbody v-else>
          <tr v-for="grantUser in grantUsers" :key="grantUser">
            <th class="align-middle" scope="row">
              <p>{{ grantUser.email }}</p>
            </th>
            <td class="align-middle">
              <p>{{ grantUser.name }}</p>
            </td>
            <td class="align-middle">
              <p>{{ grantUser.phoneNumber }}</p>
            </td>
            <td class="align-middle">
              <p>{{ grantUser.birthdate }} ({{ age(grantUser.birthdate) }})</p>
            </td>
            <td class="align-middle">
              <div class="d-grid gap-2 d-md-block">
                <router-link
                  :to="{
                    name: 'GrantUserDetail',
                    params: { id: grantUser.id },
                  }">
                  <div class="btn btn-primary mx-2 text-white">상세보기</div>
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <pagination
    :currentPage="currentPage"
    :totalPage="Math.ceil(totalValue / limit)"
    :callback="movePage"
  />
</template>

<script>
import ShimmerCell from "../../components/ShimmerCell.vue";
import moment from "moment";
import { useRouter } from "vue-router";
import Pagination from "../../components/Pagination.vue";

export default {
  components: {
    "shimmer-cell": ShimmerCell,
    pagination: Pagination,
  },
  data() {
    return {
      name: "",
      limit: 10,
      currentPage: 1,
      searchQuery: "",
      sortQuery: "name",
      sortTitle: this.$strings.LATEST()
    };
  },
  props: {
    isDataLoaded: false,
  },
  computed: {
    grantUsers() {
      return this.$store.getters["grantRequests/grantUsers"];
    },
    age() {
      return (birthdate) => {
        const today = new Date();
        const bdate = moment(birthdate).toDate();

        let age = today.getFullYear() - bdate.getFullYear();
        const month = today.getMonth() - bdate.getMonth();

        //* Same year but today month before the birthday month
        if (month < 0) {
          age = age - 1;
        }
        return age;
      };
    },
    isDataLoaded: function () {
      return this.$store.getters["grantRequests/isDataLoaded"];
    },
    totalValue: function () {
      return this.$store.getters["grantRequests/totalValue"];
    },
  },
  created() {
    this.getAllGrantUser();
  },
  methods: {
    getAllGrantUser() {
      this.$store.dispatch("grantRequests/getAllGrantUser", {
        sort: this.sortQuery,
        limit: this.limit,
        page: this.currentPage,
        search: this.searchQuery,
      });
    },
    movePage(page) {
      this.currentPage = page;
      this.getAllGrantUser();
    },
    onSearch() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        this.getAllGrantUser();
      }, 500);
    },
    sorting(query){
      switch (this.sortQuery) {
        case "date":
          this.sortTitle = this.$strings.LATEST();
          break;
        case "name":
          this.sortTitle = this.$strings.USERNAME();
          break;
        default:
          break;
      }

      this.sortQuery = query;
      this.currentPage = 1;
      this.getAllGrantUser();
    }
  },
  setup(props, context) {
    const router = useRouter();
  },
  beforeUnmount() {
    this.$store.dispatch("grantRequests/reset");
  },
};
</script>

<style scoped>
button span {
  font-family: NotoSansKR;
  color: #505d7c;
}
</style>
