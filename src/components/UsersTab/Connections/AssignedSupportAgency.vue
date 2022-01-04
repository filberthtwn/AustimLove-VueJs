<template>
  <div class="row assigned support">
    <div class="col-8">
      <p class="bold">Assigned Support Agent</p>
    </div>
    <div class="col-4 text-end">
      <button type="button" class="btn btn-primary">
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
            <label for="birthDateInp" class="form-label bold">Name</label>
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
          <div class="col">
            <label for="relationsInp" class="form-label bold"
              >Support Agency</label
            >
            <input
              type="date"
              class="form-control"
              placeholder="01/01/2021"
              name="contactPeriodInp"
              disabled
            />
          </div>
          <div class="col">
            <label for="relationsInp" class="form-label bold"
              >Job Title</label
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
</template>

<style scoped>
.row {
  margin: 1rem;
}
</style>
