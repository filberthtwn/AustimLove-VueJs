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
        <p class="d-inline bold">Volunteer Detail</p>
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
            @click.prevent="setActive('volunteerinfo')"
            :class="{ active: isActive('volunteerinfo') }"
            href="#volunteerinfo"
            ><span>Information</span></a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('assignedusers')"
            :class="{ active: isActive('assignedusers') }"
            href="#assignedusers"
            ><span>Assigned Users</span></a
          >
        </li>
      </ul>
      <div class="tab-content py-3" id="myTabContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('volunteerinfo') }"
          id="volunteerinfo"
        >
          <!-- <VolunteerInfo/> -->
          <div class="card volunteer-info my-4">
            <div class="card-body">
              <form>
                <div class="row">
                  <div class="col">
                    <label for="idInp" class="form-label bold">ID</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="123456789"
                      name="idInp"
                      :disabled="disabled"
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
                    />
                  </div>
                  <div class="col">
                    <label for="phoneNumberInp" class="form-label bold"
                      >Phone Number</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      placeholder="+6281332221998"
                      name="phoneNumberInp"
                      :disabled="disabled"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="row m-0">
            <div v-if="!editMode" class="col text-end">
              <button type="button" class="btn btn-primary me-3 px-4">
                Call
              </button>

              <button type="button" class="btn btn-warning text-white">
                Message
              </button>
            </div>
            <div v-if="editMode" class="col text-end">
              <button type="button" class="btn btn-danger text-white me-3 px-4">
                Terminate
              </button>

              <button @click.prevent="saveForm" type="button" class="btn btn-primary px-4">Save</button>
            </div>
          </div>
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('assignedusers') }"
          id="assignedusers"
        >
          <AssignedUsers />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,ref } from "vue";
import { useRouter } from "vue-router";
import VolunteerInfo from "../components/UsersTab/VolunteerDetail/VolunteerInfo.vue";
import AssignedUsers from "../components/UsersTab/VolunteerDetail/AssignedUsers.vue";

export default {
  components: {
    VolunteerInfo,
    AssignedUsers,
  },
  setup(props, context) {
    const editMode = ref(false);
    const disabled = ref(true);
    const activeItem = ref("volunteerinfo");

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

.volunteer-info.card a span {
  color: #023874;
  text-decoration: underline;
}
</style>

