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
        </div>
        <div class="row">
          <div class="col">
            <label for="nameInp" class="form-label bold">Name</label>
            <input
              type="text"
              class="form-control"
              placeholder="Fusions User"
              name="nameInp"
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
          <div class="col">
            <label for="jobTitleInp" class="form-label bold">Job Title</label>
            <input
              type="date"
              class="form-control"
              placeholder="Staff"
              name="jobTitleInp"
              disabled
            />
          </div>
        </div>
      </form>
    </div>
  </div>
  <div class="row m-0">
    <div class="col text-end">
      <button type="button" class="btn btn-primary me-3 px-4">Call</button>

      <button type="button" class="btn btn-warning text-white">Message</button>
    </div>
    <!-- <div class="col text-end">
      <button type="button" class="btn btn-danger text-white me-3 px-4">Terminate</button>

      <button type="button" class="btn btn-primary">Save</button>
    </div> -->
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
