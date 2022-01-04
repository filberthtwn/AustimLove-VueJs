<template>
  <p class="bold">User Detail</p>
  <div class="card my-4">
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
              disabled
            />
          </div>
          <div class="col">
            <label for="firstNameInp" class="form-label bold">First Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Fusions User"
              name="firstNameInp"
              disabled
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="birthDateInp" class="form-label bold">Birth Date</label>
            <input
              type="date"
              class="form-control"
              placeholder="2021-01-01"
              name="birthDateInp"
              disabled
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
              disabled
            />
          </div>
        </div>
        <div class="row">
          <label for="accountInformationInp" class="form-label bold"
            >Account Information</label
          >
          <textarea
            class="form-control mx-2"
            id="accountInformationInp"
            name="accountInformationInp"
            rows="3"
            disabled
          >
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</textarea
          >
        </div>
        <div class="row">
          <div class="col">
            <label for="contactPeriodInp" class="form-label bold"
              >Contact Period</label
            >
            <input
              type="date"
              class="form-control"
              placeholder="01/01/2021"
              name="contactPeriodInp"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="row assigned volunteer">
    <div class="col-8">
      <p class="bold">{{ $string.ASSIGNED_VOLUNTEER() }}</p>
      <p class="reg my-3">{{ $string.EMPTY_STATE_ASSIGNED_VOLUNTEER() }}</p>
    </div>
    <div class="col-4 text-end">
      <button
        @click="modal.show()"
        type="button"
        class="btn btn-primary mx-2 text-white text-end"
      >
        Assign
      </button>
    </div>
  </div>
  <div class="row assigned support">
    <div class="col-8">
      <p class="bold">{{ $string.ASSIGNED_VOLUNTEER() }}</p>
      <p class="reg my-3">{{ $string.EMPTY_STATE_ASSIGNED_VOLUNTEER() }}</p>
    </div>
    <div class="col-4 text-end">
      <button
        @click="modal.show()"
        type="button"
        class="btn btn-primary mx-2 text-white text-end"
      >
        Assign
      </button>
    </div>
  </div>
  <!-- 
  <AssignedVolunteer />

  <AssignedSupportAgency /> -->

  <div class="modal" ref="volunteerModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="volunteerModal">Assign Volunteer</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="modal.hide()"
          ></button>
        </div>
        <div class="modal-body">
          <form class="d-flex">
            <input
              class="form-control rounded-pill me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div class="dropdown d-flex justify-content-end">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>Name</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">{{ $strings.MAX_USER() }}</a></li>
              <li><a class="dropdown-item" href="#">{{ $strings.MIN_USER() }}</a></li>
            </ul>
          </div>
          <form>
            <ul
              class="list-group w-100 overflow-scroll"
              style="height: 30vh; border: 1px solid #eee"
            >
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
            </ul>
            <div class="col mt-4">
              <label for="relationsToUserInp" class="form-label bold"
                >Relation to User</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="e.g. Friends"
                name="relationsToUserInp"
              />
            </div>
          </form>
          <button type="button" class="btn btn-primary w-100 mt-3">Assign</button>
        </div>
        
      </div>
    </div>
  </div>
  <div class="modal" ref="supportAgentModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="supportAgentModal">Assign Support Agent</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="modal.hide()"
          ></button>
        </div>
        <div class="modal-body">
          <form class="d-flex">
            <input
              class="form-control rounded-pill me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          <div class="dropdown d-flex justify-content-end">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>Name</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#">Max. User</a></li>
              <li><a class="dropdown-item" href="#">Min. User</a></li>
            </ul>
          </div>
          <form>
            <ul
              class="list-group w-100 overflow-scroll"
              style="height: 30vh; border: 1px solid #eee"
            >
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
              <li class="list-group-item my-2">
                <div class="form-check">
                  <label class="form-check-label" for="flexRadioDefault1">
                    Fusions Volunteer 1
                  </label>
                  <input
                    class="form-check-input float-end"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                  />
                </div>
              </li>
            </ul>
            
          </form>
          <button type="button" class="btn btn-primary w-100 mt-3">Assign</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

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
/* 
.list-group-item {
  border: none;
} */
</style>

<script>
import { computed } from "vue";
import { ref, onMounted } from "vue";
import { Modal } from "bootstrap";
import AssignedVolunteer from "../../components/UsersTab/Connections/AssignedVolunteer.vue";
import AssignedSupportAgency from "../../components/UsersTab/Connections/AssignedSupportAgency.vue";

export default {
  components: {
    AssignedVolunteer,
    AssignedSupportAgency,
  },
  setup() {
    const volunteerModal = ref(null);
    const supportAgentModal = ref(null);
    const modal = ref(null);

    onMounted(() => {
      modal.value = new Modal(volunteerModal.value);
      modal.value = new Modal(supportAgentModal.value);
    });

    return { volunteerModal,supportAgentModal, modal };
  },
};
</script>
