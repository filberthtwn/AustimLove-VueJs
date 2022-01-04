<template>
  <div class="card my-4">
    <div class="card-body">
      <div class="row">
        <div class="col text-start"><p>회원 등록</p></div>
        <div class="col text-end bold">
          <router-link :to="{name: 'Users'}">전체 보기</router-link>
        </div>
      </div>
      <h1 class="card-title my-2">{{ regisRequestCount }} 회원</h1>
    </div>
  </div>

  <div class="card h-100 my-4" style="max-height: 50vh;">
    <div class="card-body" style="overflow-y: auto">
      <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="i in regisRequests.length" :key="i">
      <div>
        <p>{{ formatDate(regisRequests[i-1].createdAt) }}</p>
        <p class="bold">{{ regisRequests[i-1].name }}</p>
      </div>
    </li>
  </ul>
    </div>
  </div>

  
</template>

<script>
import moment from 'moment';

export default {
  computed: {
    regisRequests(){
      return this.$store.getters['users/regisRequests'];
    },
    regisRequestCount(){
      return this.$store.getters['users/totalValue'];
    },
  },
  methods: {
    formatDate(dateString){
      return moment(dateString).format('YYYY/MM/DD');
    },
  },
}
</script>


<style scoped>
p, h1 {
  color: #505D7C;
}

.card-title{
  font-size: 30px;
  margin: 0;
}
a {
  text-decoration: none;
  color: #023366;
}
</style>