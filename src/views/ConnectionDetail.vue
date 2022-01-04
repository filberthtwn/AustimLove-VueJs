<template>
<div>
  <base-modal :isShow="isModalShow">
      <!-- UPDATE CONFIRMATION CONTAINER -->
      <div id="confirmation-d">
          <div class="d-flex flex-column p-3" v-if="!isLoading">
              <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
              <div class="d-flex mx-auto gap-3">
                  <button class="btn btn-outline-primary" style="width: 150px" @click="toggleEditConfirmation()">
                      {{ $strings.NO() }}
                  </button>
                  <button class="btn btn-primary" style="width: 150px" @click="confirmAction()">
                      {{ $strings.YES() }}
                  </button>
              </div>
          </div>
          <load-widget :loading="true"  :size="'72px'" v-else/>
      </div>
  </base-modal>

  <div class="container">
    <div class="row my-2 align-items-start">
      <div class="col d-flex text-start align-middle">
        <div
          @click="backToUserList"
          class="btn btn-primary d-flex mx-2 p-0"
          style="height: 32px; width: 32px"
        >
          <svg
            class="vue-icon m-auto"
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
        </div>
        <p class="d-inline text-center my-auto bold">{{ $strings.USER_LIST() }}</p>
      </div>
      <div class="col h-100 text-center align-middle">
        <p class="d-inline bold">회원 정보</p>
      </div>
      <div class="col text-end align-middle"></div>
    </div>

    <!-- ALERT COMPONENT -->
    <custom-alert class="mt-4" v-if="(response)" :isSuccess="response.success" :message="response.message"/>
    
    <div class="row my-4">
      <div class="col">
        
        <div class="d-flex justify-content-between">
          <p class="bold my-auto">회원 정보</p>

          <button 
          id="saveAssignedVolunteer"
          class="btn btn-primary ms-auto"
          type="button"
          @click="toggleEditUserMode()"
          v-if="!isUserEdited">
              <div class="d-flex">
                <p class="text-white me-2">{{ $strings.EDIT() }}</p>
                <img src="@/assets/img/ui/ic_edit.svg" alt="">
              </div>
          </button>

          <button 
          id="saveAssignedVolunteer"
          class="btn btn-primary ms-auto"
          type="button"
          @click="toggleModalUser()"
          v-else>
              <p class="text-white">{{ $strings.SAVE() }}</p>
          </button>
        </div>
        
        <div class="card user-info my-4">
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col">
                  <label for="idInp" class="form-label bold">{{ $strings.ID() }}</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g. user@autismlove.com"
                    name="idInp"
                    disabled
                    :value="!disabled ? user.email : ''"
                  />
                </div>
                <div class="col">
                  <label for="firstNameInp" class="form-label bold"
                    >성명</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Fusions User"
                    name="firstNameInp"
                    disabled
                    :value="!disabled ? user.name : ''"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="birthDateInp" class="form-label bold"
                    >생년월일</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    placeholder="2021-01-01"
                    name="birthDateInp"
                    disabled
                    :value="!disabled ? user.birthdate : ''"
                  />
                </div>
                <div class="col">
                  <label for="phoneNumberInp" class="form-label bold"
                    >연락처</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g 08123456789"
                    name="phoneNumberInp"
                    disabled
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label for="bank_name" class="form-label bold"
                    >은행 이름</label
                  >
                  <input
                    class="form-control"
                    placeholder="e.g. Citilink Bank"
                    name="bank_name"
                    disabled
                    :value="!disabled ? user.bankName : ''"
                  />
                </div>
                <div class="col">
                  <label for="bank_account_number" class="form-label bold"
                    >계좌번호</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="e.g. 123456789"
                    name="bank_account_number"
                    disabled
                    :value="!disabled ? user.bankAccountNumber : ''"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label 
                    for="contract_period_start"
                    class="form-label bold">
                    {{ $strings.CONTRACT_PERIOD_START() }}
                  </label>

                  <input
                    type="date"
                    class="form-control"
                    placeholder="01/01/2021"
                    name="contract_period_start"
                    v-model="user.contract_period_start"
                    :disabled="!isUserEdited" />
                </div>
                <div class="col">
                  <label 
                    for="contract_period_end" 
                    class="form-label bold">
                    {{ $strings.CONTRACT_PERIOD_END() }}}
                  </label>

                  <input
                    type="date"
                    class="form-control"
                    placeholder="01/01/2021"
                    name="contract_period_end"
                    v-model="user.contract_period_end"
                    :disabled="!isUserEdited" />
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          v-if="user.volunteer.name == '-'"
          class="row m-0 my-3 assigned volunteer"
        >
          <div class="col-8 px-0">
            <p class="bold">{{ $strings.ASSIGNED_VOLUNTEER() }}</p>
            <p class="reg my-3">
              {{ $strings.EMPTY_STATE_ASSIGNED_VOLUNTEER() }}
            </p>
          </div>
          <div class="col-4 px-0 text-end">
            <button
              @click="
                toggleModalVolunteer();
                selectRole('VOLUNTEER');
              "
              type="button"
              class="btn btn-primary mx-2 text-white text-end">
              연결
            </button>
          </div>
        </div>
        <div
          v-if="user.supportAgent.name == '-'"
          class="row m-0 my-3 assigned support"
        >
          <div class="col-8 px-0">
            <p class="bold">
              {{ $strings.ASSIGNED_SUPPORT_AGENT() }}
            </p>
            <p class="reg my-3">
              {{ $strings.EMPTY_STATE_ASSIGNED_SUPPORT_AGENT() }}
            </p>
          </div>
          <div class="col-4 px-0 text-end">
            <button
              @click="
                toggleModalSupportAgent();
                selectRole('SUPPORT_AGENT');
              "
              type="button"
              class="btn btn-primary mx-2 text-white text-end">
              연결
            </button>
          </div>
        </div>
        <div v-if="user.volunteer.name != '-'" class="volunteer-area">
          <div
            class="row m-0 my-3 assigned volunteer"
            style="display: flex; align-items: center"
          >
            <div class="col-8 px-0">
              <p class="bold">{{ $strings.ASSIGNED_VOLUNTEER() }}</p>
            </div>
            <div class="col-4 px-0 text-end">
               <button
                type="button"
                id="reassignVolunteer"
                class="btn btn-secondary me-2"
                v-if="!editVolunteerMode"
                @click="toggleModalVolunteer();
                selectRole('VOLUNTEER');"
                style="border: 2px solid #023366;">
                {{ $strings.REASSIGN() }}
              </button>

              <button
                type="button"
                id="editAssignedVolunteer"
                class="btn btn-primary"
                v-if="!editVolunteerMode"
                @click="toggleEditVolunteerMode">
                {{ $strings.EDIT() }}<svg
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
              <button
                type="button"
                id="saveAssignedVolunteer"
                class="btn btn-primary"
                v-if="editVolunteerMode"
                @click="saveVolunteerForm(user.volunteer._id)"
              >
                {{ $strings.SAVE() }}
              </button>
            </div>
          </div>
          <div class="card my-4">
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col">
                    <label for="idInp" class="form-label bold">{{ $strings.ID() }}</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="123456789"
                      name="idInp"
                      :disabled="disabledVolunteer"
                      v-model="user.volunteer.email"
                    />
                  </div>
                  <div class="col">
                    <label for="firstNameInp" class="form-label bold">{{ $strings.NAME() }}</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Fusions User"
                      name="firstNameInp"
                      :disabled="disabledVolunteer"
                      v-model="user.volunteer.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="birthDateInp" class="form-label bold"
                      >생년월일</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      placeholder="2021-01-01"
                      name="birthDateInp"
                      :disabled="disabledVolunteer"
                      v-model="user.volunteer.birthdate"
                    />
                  </div>
                  <div class="col">
                    <label for="phoneNumberInp" class="form-label bold"
                      >연락처</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="+6281332221998"
                      name="phoneNumberInp"
                      v-model="user.volunteer.phone_number"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="relationsInp" class="form-label bold"
                      >{{ $strings.RELATION_TO_USER() }}</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g. Friends"
                      name="contactPeriodInp"
                      :disabled="disabledVolunteer"
                    />
                  </div>
                  <div class="col">
                    <label for="allowView" class="form-label bold"
                      >{{ $strings.ALLOW_VIEWING_OF_USER_ACCOUNT() }}</label
                    >
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        :disabled="disabledVolunteer"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div v-if="user.supportAgent.name != '-'" class="support-agency-area">
          <div
            class="row m-0 my-3 assigned support"
            style="display: flex; align-items: center"
          >
            <div class="col-8 px-0">
              <p class="bold">{{ $strings.ASSIGNED_SUPPORT_AGENT() }}</p>
            </div>
            <div class="col-4 px-0 text-end">
              <button
                type="button"
                id="reassignSupportAgent"
                class="btn btn-secondary me-2"
                v-if="!editSupportAgentMode"
                @click="toggleModalSupportAgent();
                selectRole('SUPPORT_AGENT');"
                style="border: 2px solid #023366;"
              >
                {{ $strings.REASSIGN() }}
              </button>

              <button
                type="button"
                id="editAssignedSupportAgent"
                class="btn btn-primary"
                v-if="!editSupportAgentMode"
                @click="toggleEditSupportAgentMode()">
                {{ $strings.EDIT() }}
                <svg
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

              <button
                type="button"
                id="saveAssignedSupportAgent"
                class="btn btn-primary"
                v-if="editSupportAgentMode"
                @click="saveSupportAgentForm(user.supportAgent._id)">
                {{ $strings.SAVE() }}
              </button>
            </div>
          </div>
          <div class="card my-4">
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col">
                    <label for="idInp" class="form-label bold">{{ $strings.ID() }}</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="123456789"
                      name="idInp"
                      :disabled="disabledSupportAgent"
                      v-model="user.supportAgent.email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="nameInp" class="form-label bold">{{ $strings.NAME() }}</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g, Support Agency"
                      name="nameInp"
                      :disabled="disabledSupportAgent"
                      v-model="user.supportAgent.name"
                    />
                  </div>
                  <div class="col">
                    <label for="phoneNumberInp" class="form-label bold"
                      >{{ $strings.PHONE_NUMBER() }}</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="+6281332221998"
                      name="phoneNumberInp"
                      v-model="user.supportAgent.phone_number"
                      disabled
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <label for="relationsInp" class="form-label bold"
                      >{{ $strings.SUPPORT_AGENCY() }}</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g. Support Agency"
                      name="contactPeriodInp"
                      :disabled="disabledSupportAgent"
                      v-model="user.supportAgent.support_agency"
                    />
                  </div>
                  <div class="col">
                    <label for="relationsInp" class="form-label bold"
                      >{{ $strings.JOB_TITLE() }}</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="e.g. Chef"
                      name="contactPeriodInp"
                      :disabled="disabledSupportAgent"
                      v-model="user.supportAgent.job_title"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  

  <base-modal :isShow="isModalSupportAgentShow">
    <div id="assign-support-agent-form" v-if="!showConfirmation">
      <form enctype="multipart/form-data" v-on:submit.prevent="onSubmit">
        <div class="container-fluid">
          <div class="row mb-5">
            <div class="col-2">&nbsp;</div>
            <div class="col-8">
              <h1 class="text-center">지원기관 연결</h1>
            </div>
            <div class="col-2 d-flex">
              <button
                class="btn my-auto ms-auto p-0"
                style="line-height: 0rem"
                @click="toggleModalSupportAgent()"
              >
                <img src="@/assets/img/ui/ic_times.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <form class="d-flex">
                <input
                  class="form-control rounded-pill me-2"
                  type="search"
                  placeholder="검색"
                  aria-label="Search"
                />
              </form>
              <div class="d-grid gap-4">
                <div class="dropdown d-flex justify-content-end">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span>{{ $strings.NAME() }}</span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">Max. User</a></li>
                    <li><a class="dropdown-item" href="#">Min. User</a></li>
                  </ul>
                </div>
                <div class="overflow-hidden" style="height: 300px;">
                  <ul
                  class="list-group w-100 h-100 overflow-auto"
                  style="border: 1px solid #eee">
                    <li
                      v-for="(user, index) in users"
                      :key="user"
                      class="list-group-item my-2"
                    >
                      <div class="form-check">
                        <label class="form-check-label" :for="index">
                          {{ user.name }}
                        </label>
                        <input
                          class="form-check-input float-end"
                          type="radio"
                          name="supportAgent"
                          :id="index"
                          :data-id="user.id"
                          @change="onChangeSupportAgent"
                        />
                      </div>
                    </li>
                  </ul>
                </div>

                <div v-if="!isSubmit">
                  <button
                    class="btn btn-primary w-100"
                    @click="toggleConfirmation"
                  >
                    연결
                  </button>
                </div>
                <load-widget v-else></load-widget>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!-- UPDATE CONFIRMATION CONTAINER -->
      <div id="confirmation-d" v-else>
          <div class="d-flex flex-column p-3" v-if="!isLoading">
              <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
              <div class="d-flex mx-auto gap-3">
                  <button class="btn btn-outline-primary" style="width: 150px" @click="toggleConfirmation()">
                      {{ $strings.NO() }}
                  </button>
                  <button class="btn btn-primary" style="width: 150px" @click="assignConfirmAction()">
                      {{ $strings.YES() }}
                  </button>
              </div>
          </div>
          <load-widget :loading="true"  :size="'72px'" v-else/>
      </div>
  </base-modal>

  <base-modal :isShow="isModalVolunteerShow">
  <div id="assign-volunteer-form" v-if="!showConfirmation">
    <form enctype="multipart/form-data" v-on:submit.prevent="onSubmit">
      <div class="container-fluid">
        <div class="row mb-3">
          <div class="col-2">&nbsp;</div>
          <div class="col-8">
            <h1 class="text-center">지원자 연결</h1>
          </div>
          <div class="col-2 d-flex">
            <button
              class="btn my-auto ms-auto p-0"
              style="line-height: 0rem"
              @click="toggleModalVolunteer()"
            >
              <img src="@/assets/img/ui/ic_times.svg" alt="" />
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <form class="d-flex">
              <input
                class="form-control rounded-pill me-2"
                type="search"
                placeholder="검색"
                aria-label="Search"
              />
            </form>

            <div class="d-grid gap-2">
              <div class="dropdown d-flex justify-content-end">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>{{ $strings.NAME() }}</span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item" href="#">{{ $strings.MAX_USER() }}</a></li>
                  <li><a class="dropdown-item" href="#">{{ $strings.MIN_USER() }}</a></li>
                </ul>
              </div>
              
              <div class="overflow-hidden" style="height: 300px;">
                <ul
                class="list-group w-100 h-100 overflow-auto"
                style="border: 1px solid #eee">
                <li
                  v-for="(user, index2) in users"
                  :key="user"
                  class="list-group-item my-2">
                  <div class="form-check">
                    <label class="form-check-label" :for="index2">
                      {{ user.name }}
                    </label>
                    <input
                      class="form-check-input float-end"
                      type="radio"
                      name="volunteer"
                      :id="index2"
                      :data-id="user.id"
                      @change="onChangeVolunteer"
                    />
                  </div>
                </li>
              </ul>
              </div>

              <div class="col my-4">
                <label for="relationsToUserInp" class="form-label bold"
                  >관계</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="e.g. Friends"
                  name="relationsToUserInp"
                  v-model="relationsToUserInp"
                />
              </div>
              <div v-if="!isSubmit">
                <button class="btn btn-primary w-100" @click="toggleConfirmation()">
                  연결
                </button>
              </div>
              <load-widget v-else></load-widget>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
  <!-- UPDATE CONFIRMATION CONTAINER -->
  <div id="confirmation-d" v-else>
      <div class="d-flex flex-column p-3" v-if="!isLoading">
          <h6 class="text-center mb-4" v-html="$strings.UPDATE_CONFIRMATION()"/>
          <div class="d-flex mx-auto gap-3">
              <button class="btn btn-outline-primary" style="width: 150px" @click="toggleConfirmation()">
                  {{ $strings.NO() }}
              </button>
              <button class="btn btn-primary" style="width: 150px" @click="assignConfirmAction()">
                  {{ $strings.YES() }}
              </button>
          </div>
      </div>
      <load-widget :loading="true"  :size="'72px'" v-else/>
  </div>
  </base-modal>
</template>

<script>
import { ref, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import store from "../store/index";

export default {
  data() {
    return {
      isModalSupportAgentShow: false,
      isModalVolunteerShow: false,
      toggleEditVolunteerMode: false,
      toggleEditSupportAgentMode: false,
      isModalShow: false,
      selectedVolunteerId: null,
      isLoading: false,
      editedRole: '',
      showConfirmation: false,
      isUserEdited: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters["users/user"];
    },
    users: function () {
      return this.$store.getters["users/users"];
    },
    isSubmit() {
      return this.$store.getters["users/isSubmit"];
    },
    response(){
      return this.$store.getters["users/response"];
    },
  },
  watch: {
    isSubmit: function () {
      if (!this.isSubmit) {
        this.isModalSupportAgentShow = false;
        this.isModalVolunteerShow = false;
      }
    },
    response: function () {
        this.isLoading = false;
        this.isModalShow = false;

        if (this.editedRole == 'VOLUNTEER'){
          this.editVolunteerMode = false;
          this.disabledVolunteer = true;
        }else {
          this.editSupportAgentMode = false;
          this.disabledSupportAgent = true;
        }

        this.isUserEdited = false;
    }
  },

  created() {
    this.$store.dispatch("users/getUserDetail", {
      id: this.id,
    });

    this.getAllUser();
  },

  methods: {
    getAllUser() {
      this.$store.dispatch("users/getAllUser", {
        role: this.role,
        name: this.searchQuery,
      });
    },

    selectRole(role) {
      this.role = role;
      this.getAllUser();
    },

    toggleModalSupportAgent() {
      this.editedRole = 'SUPPORT_AGENT'
      this.isModalSupportAgentShow = !this.isModalSupportAgentShow;
    },

    toggleModalVolunteer() {
      this.editedRole = 'VOLUNTEER'
      this.isModalVolunteerShow = !this.isModalVolunteerShow;
    },

    toggleModalUser() {
      this.editedRole = 'USER';
      this.isModalShow = true;
    },

    saveUserForm(){
      this.editedRole = 'USER';
      this.isModalShow = true;

      updateUser();      
    },

    saveVolunteerForm() {
      this.editedRole = 'VOLUNTEER';
      this.isModalShow = true;

      updateVolunteer();      
    },

    saveSupportAgentForm() {
      this.editedRole = 'SUPPORT_AGENT';
      this.isModalShow = true;

      updateSupoortAgent();
    },
    
    confirmAction(){
      if (this.editedRole == 'USER'){
        this.updateUser();
        return;
      }

      if (this.editedRole == 'VOLUNTEER'){
        this.updateVolunteer();
        return;
      }

      this.updateSupportAgent();
    },

    toggleConfirmation(){
      this.showConfirmation = !this.showConfirmation;
    },

    toggleEditConfirmation(){
      this.isModalShow = !this.isModalShow;
    },

    assignConfirmAction(){
      this.isLoading = true;
      this.reassignUser();
    },

    reassignUser(){
      const payload = {
        id: this.user.id
      }

      if(this.editedRole == 'VOLUNTEER'){
        payload.volunteer_id = this.volunteerId;
      }

      if(this.editedRole == 'SUPPORT_AGENT'){
        payload.support_agent_id = this.supportAgentId;
      }

      store.dispatch("users/reassignUser", payload);
    },
    
    assignVolunteer() {
      const payload = {
        id: this.user.id,
        volunteer_id: this.volunteerId,
      };
      store.dispatch("users/assignVolunteer", payload);
    },

    assignSupportAgent() {
      const payload = {
        id: this.user.id,
        support_agent_id: this.supportAgentId,
      };
      store.dispatch("users/assignSupportAgent", payload);
    },

    updateUser(){
      this.isLoading = true;
      
      const user = this.user;
      let params = {
        'user_id': user.id,
        'contract_period_start': user.contract_period_start,
        'contract_period_end': user.contract_period_end
      };
      store.dispatch('users/updateUser', params);
    },

    updateVolunteer(){
      this.isLoading = true;
      
      const user = this.user;
      let params = {
         '_id': user.volunteer._id,
          'email': user.volunteer.email,
          'name': user.volunteer.name,
          'birthdate': user.volunteer.birthdate,
      };
      store.dispatch('users/updateVolunteer', params);
    },

    updateSupportAgent(){
      this.isLoading = true;

      const user = this.user;
      let params = {
          '_id': user.supportAgent._id,
          'email': user.supportAgent.email,
          'name': user.supportAgent.name,
          'support_agency': user.supportAgent.support_agency,
          'job_title': user.supportAgent.job_title
      };
      store.dispatch('users/updateSupportAgent', params);
    },

    toggleEditUserMode() {
      this.isUserEdited = true;
    },
  },
  props: ["id"],
  setup(props) {
    const router = useRouter();

    const relationsToUserInp = ref("");
    const volunteerId = ref("");
    const supportAgentId = ref("");
    const { id } = toRefs(props);

    const editVolunteerMode = ref(false);
    const editSupportAgentMode = ref(false);
    const disabledVolunteer = ref(true);
    const disabledSupportAgent = ref(true);

    const user = computed(() => {
      const user = store.getters["users/user"];
      return user;
    });

    const backToUserList = () => {
      router.push("/users/connections");
    };

    const onChangeVolunteer = (event) => {
      volunteerId.value = event.target.dataset.id;
      console.log(volunteerId.value);
    };

    const onChangeSupportAgent = (event) => {
      supportAgentId.value = event.target.dataset.id;
      console.log(supportAgentId.value);
    };

    const toggleEditVolunteerMode = () => {
      editVolunteerMode.value = true;
      disabledVolunteer.value = false;
    };

    const toggleEditSupportAgentMode = () => {
      editSupportAgentMode.value = true;
      disabledSupportAgent.value = false;
    };

    return {
      backToUserList,
      volunteerId,
      relationsToUserInp,
      supportAgentId,
      onChangeVolunteer,
      onChangeSupportAgent,
      toggleEditVolunteerMode,
      toggleEditSupportAgentMode,
      editVolunteerMode,
      editSupportAgentMode,
      disabledVolunteer,
      disabledSupportAgent,
      user
    };
  },
};
</script>

<style scoped>
.row {
  margin: 1rem;
}
.assigned .reg {
  color: black;
}

.form-check {
  padding-left: 0;
}
.form-switch {
  margin-top: 1em;
  padding-left: 2.5em !important;
}
.list-group-item {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}

.back-button {
  /* height: 2rem;
  padding: 0.1rem 0.5rem !important;
  line-height: 0rem; */
  height: 32px;
  width: 32px;
}
</style>
