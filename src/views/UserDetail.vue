<template>
  <div class="container">
    <div class="row my-2 align-items-start">
      <div class="col text-start align-middle">
        <button
          type="button"
          @click="backToUserList"
          class="btn btn-primary mx-2"
          style="padding: 0.1rem 0.6rem !important"
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
        <p class="d-inline text-center bold">User List</p>
      </div>
      <div class="col h-100 text-center align-middle">
        <p class="d-inline bold">User Detail</p>
      </div>
      <div class="col text-end align-middle">
        <button @click.prevent="switchToEditMode" type="button" class="btn btn-primary">
          Edit<svg
            class="ms-2"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21928L15.74 3.59283Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="row my-4">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('userinfo')"
            :class="{ active: isActive('userinfo') }"
            href="#userinfo"
            ><span>User Information</span></a
          >
        </li>
        <li class="nav-item">
          <router-link 
          class="nav-link"
           @click.prevent="setActive('balancehistory')"
          :class="{ active: isActive('balancehistory') }"
          :to="{name: 'BalanceHistory'}">
          Balance History
          </router-link>
        </li>
      </ul>
      <div class="tab-content py-3" id="myTabContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('userinfo') }"
          id="userinfo"
        >
          <!-- <UserInfo/> -->
          <div class="card user-info my-4">
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col">
                    <label for="idInp" class="form-label bold">ID</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g. user@autismlove.com"
                      name="idInp"
                      :disabled="disabled"
                      :value="disabled ? user.email : ''"
                    />
                  </div>
                  <div class="col">
                    <label for="firstNameInp" class="form-label bold"
                      >First Name</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Fusions User"
                      name="firstNameInp"
                      :disabled="disabled"
                      :value="disabled ? user.name : ''"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="birthDateInp" class="form-label bold"
                      >Birth Date</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      placeholder="2021-01-01"
                      name="birthDateInp"
                      :disabled="disabled"
                      :value="disabled ? user.birthdate : ''"
                    />
                  </div>
                  <div class="col">
                    <label for="phoneNumberInp" class="form-label bold"
                      >Phone Number</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g 08123456789"
                      name="phoneNumberInp"
                      :disabled="disabled"
                      :value="disabled ? user.phoneNumber : ''"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="bank_name" class="form-label bold">Bank Name</label>
                    <input
                      class="form-control"
                      placeholder="e.g. Citilink Bank"
                      name="bank_name"
                      :disabled="disabled"
                      :value="disabled ? user.bankName : ''"
                    />
                  </div>
                  <div class="col">
                    <label for="bank_account_number" class="form-label bold">Bank Account Number</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g. 123456789"
                      name="bank_account_number"
                      :disabled="disabled"
                      :value="disabled ? user.bankAccountNumber : ''"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="contract_period_start" class="form-label bold"
                      >{{ $strings.CONTRACT_PERIOD_START() }}</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      placeholder="01/01/2021"
                      name="contract_period_start"
                      :disabled="disabled"
                      :value="disabled ? user.contract_period_start : ''"
                    />
                  </div>
                  <div class="col">
                    <label for="contract_period_end" class="form-label bold"
                      >{{ $strings.CONTRACT_PERIOD_END() }}</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      placeholder="01/01/2021"
                      name="contract_period_end"
                      :disabled="disabled"
                      :value="disabled ? user.contract_period_end : ''"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="volunteerInp" class="form-label bold"
                      >Volunteer</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Fusions Volunteer"
                      name="volunteerInp"
                      :disabled="disabled"
                      :value="disabled ? user.volunteer.name : ''"
                    />
                  </div>
                  <div class="col">
                    <label for="supportAgencyInp" class="form-label bold"
                      >Support Agency</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Fusions Agency"
                      name="supportAgencyInp"
                      :disabled="disabled"
                      :value="disabled ? user.supportAgent.name : ''"
                    />
                  </div>
                </div>
              </form>
              <div class="row mt-4">
                <div class="col-3 text-start align-middle">
                  <svg
                    width="13"
                    height="19"
                    viewBox="0 0 13 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.09076 4.03197L10.3907 12.6155C10.8327 14.2651 9.85465 15.9591 8.20511 16.4011C6.55558 16.8431 4.86153 15.865 4.41954 14.2155L1.91958 4.88555C1.64359 3.85552 2.25556 2.79556 3.28558 2.51956C4.31561 2.24357 5.37557 2.85553 5.65157 3.88556L7.75153 11.7227C7.86153 12.1333 7.61565 12.5591 7.20513 12.6691C6.79461 12.7791 6.36874 12.5332 6.25874 12.1227L4.35877 5.03195L3.23917 5.33195L5.13914 12.4227C5.41514 13.4527 6.4751 14.0647 7.50513 13.7887C8.53515 13.5127 9.14712 12.4528 8.87113 11.4227L6.77116 3.58557C6.32917 1.93603 4.63513 0.957973 2.98559 1.39997C1.33605 1.84196 0.357994 3.536 0.799986 5.18554L3.29994 14.5155C3.90793 16.7846 6.23606 18.1287 8.50511 17.5207C10.7742 16.9127 12.1183 14.5846 11.5103 12.3155L9.21035 3.73198L8.09076 4.03197Z"
                      fill="#023366"
                    /></svg
                  ><a class="ms-1 bold"><span>See Plan</span></a>
                </div>
                <div class="col-3 text-start align-middle">
                  <svg
                    width="13"
                    height="19"
                    viewBox="0 0 13 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.09076 4.03197L10.3907 12.6155C10.8327 14.2651 9.85465 15.9591 8.20511 16.4011C6.55558 16.8431 4.86153 15.865 4.41954 14.2155L1.91958 4.88555C1.64359 3.85552 2.25556 2.79556 3.28558 2.51956C4.31561 2.24357 5.37557 2.85553 5.65157 3.88556L7.75153 11.7227C7.86153 12.1333 7.61565 12.5591 7.20513 12.6691C6.79461 12.7791 6.36874 12.5332 6.25874 12.1227L4.35877 5.03195L3.23917 5.33195L5.13914 12.4227C5.41514 13.4527 6.4751 14.0647 7.50513 13.7887C8.53515 13.5127 9.14712 12.4528 8.87113 11.4227L6.77116 3.58557C6.32917 1.93603 4.63513 0.957973 2.98559 1.39997C1.33605 1.84196 0.357994 3.536 0.799986 5.18554L3.29994 14.5155C3.90793 16.7846 6.23606 18.1287 8.50511 17.5207C10.7742 16.9127 12.1183 14.5846 11.5103 12.3155L9.21035 3.73198L8.09076 4.03197Z"
                      fill="#023366"
                    /></svg
                  ><a class="ms-1 bold"><span>See Contract</span></a>
                </div>
                <div class="col-6 text-end align-middle">
                  <svg
                    width="13"
                    height="19"
                    viewBox="0 0 13 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.09076 4.03197L10.3907 12.6155C10.8327 14.2651 9.85465 15.9591 8.20511 16.4011C6.55558 16.8431 4.86153 15.865 4.41954 14.2155L1.91958 4.88555C1.64359 3.85552 2.25556 2.79556 3.28558 2.51956C4.31561 2.24357 5.37557 2.85553 5.65157 3.88556L7.75153 11.7227C7.86153 12.1333 7.61565 12.5591 7.20513 12.6691C6.79461 12.7791 6.36874 12.5332 6.25874 12.1227L4.35877 5.03195L3.23917 5.33195L5.13914 12.4227C5.41514 13.4527 6.4751 14.0647 7.50513 13.7887C8.53515 13.5127 9.14712 12.4528 8.87113 11.4227L6.77116 3.58557C6.32917 1.93603 4.63513 0.957973 2.98559 1.39997C1.33605 1.84196 0.357994 3.536 0.799986 5.18554L3.29994 14.5155C3.90793 16.7846 6.23606 18.1287 8.50511 17.5207C10.7742 16.9127 12.1183 14.5846 11.5103 12.3155L9.21035 3.73198L8.09076 4.03197Z"
                      fill="#023366"
                    />
                  </svg>
                  <a class="ms-1 bold"><span>See User Agreement</span></a>
                </div>
              </div>
            </div>
          </div>
          <div v-if="editMode" class="col text-end">
            <button type="button" class="btn btn-danger text-white me-3 px-4">
              Terminate
            </button>

            <button @click.prevent="saveForm" type="button" class="btn btn-primary px-4">Save</button>
          </div>
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('balancehistory') }"
          id="balancehistory"
        >
          <BalanceHistory />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import UserInfo from "../components/UsersTab/UserDetail/UserInfo.vue";
import BalanceHistory from "../components/UsersTab/UserDetail/BalanceHistory.vue";

export default {
  components: {
    UserInfo,
    BalanceHistory,
  },
  computed:{
    user(){
      const user = this.$store.getters['users/user'];
      return user;
    }
  },
  props: ['id'],
  created() {
    this.$store.dispatch('users/getUserDetail', {
      'id': this.id,
    });
  },
  setup(props, context) {
    // console.log(props);
    
    const editMode = ref(false);
    const disabled = ref(true);
    const activeItem = ref("userinfo");

    const isActive = (val) => {
      return activeItem.value === val; // true/false
    };
    const setActive = (val) => {
      activeItem.value = val;
    };

    const switchToEditMode = () => {
      editMode.value = true;
      disabled.value = false;
    };

    const saveForm = () => {
      editMode.value = false;
      disabled.value = true;
    };

    const router = useRouter();

    const backToUserList = () => {
      router.push("/users");
    };


    return { isActive, setActive, switchToEditMode, editMode, disabled, saveForm, backToUserList };
  },
};
</script>

<style scoped>
.row {
  margin: 1rem;
}

.card.user-info a span {
  color: #023874;
  text-decoration: underline;
  cursor: pointer;
}
</style>
