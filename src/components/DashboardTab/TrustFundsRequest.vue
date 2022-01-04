<template>
  <div class="card my-4">
    <div class="card-body">
      <div class="row">
        <div class="col text-start"><p>신탁 자금 요청</p></div>
        <div class="col text-end bold">
          <router-link :to="{name: 'GrantRequest'}">전체 보기</router-link>
        </div>
      </div>
      <h1 class="card-title my-2">{{ grantRequestCount }} 요청</h1>
    </div>
  </div>

  <div class="card h-100 my-4" style="max-height: 50vh;">
    <div class="card-body overflow-auto">
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="grantRequest in grantRequests" :key="grantRequest">
          <div>
            <div class="row">
              <div class="col">
                <p>{{ formatDate(grantRequest.created_at) }}</p>
              </div>
              <div class="col text-end">
                <p>₩{{ grantRequest.amount }}</p>
              </div>
            </div>
            <p class="bold">{{ grantRequest.requester.name }}</p>
            <p>{{ grantRequest.request_reason }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
p,
h1 {
  color: #505d7c;
}

.card-title {
  font-size: 30px;
  margin: 0;
}

a {
  text-decoration: none;
  color: #023366;
}
</style>

<script>
import moment from 'moment';

export default {
  computed: {
    grantRequests(){
      return this.$store.getters['grantRequests/requests'];
    },
    grantRequestCount(){
      return this.$store.getters['grantRequests/totalValue'];
    },
  },
  methods: {
    formatDate(dateString){
      return moment(dateString).format('YYYY/MM/DD');
    },
  },
}
</script>



