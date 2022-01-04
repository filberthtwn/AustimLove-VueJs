<template>
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
            <label for="phoneNumberInp" class="form-label bold">Phone Number</label>
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
        <div class="row">
          <div class="col">
            <label for="volunteerInp" class="form-label bold">Volunteer</label>
            <input
              type="text"
              class="form-control"
              placeholder="Fusions Volunteer"
              name="volunteerInp"
              disabled
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
              disabled
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
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    query: String,
  },
  setup(props, context) {
    return {};
  },
};
</script>

<style scoped>
.row {
  margin: 1rem;
}

a span {
  color: #023874;
  text-decoration: underline;
}
</style>
