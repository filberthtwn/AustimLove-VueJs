<template>
  <div class="card my-4">
    <div class="card-body">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"><p class="bold">No</p></th>
            <th scope="col"><p class="bold">Name</p></th>
            <th scope="col"><p class="bold">Action</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="align-middle" scope="row"><p>1</p></th>
            <td class="align-middle"><p>Fusions Volunteer</p></td>
            <td class="align-middle">
              <div class="d-grid gap-2 d-md-block">
                <button type="button" class="btn btn-danger mx-2 text-white">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th class="align-middle" scope="row"><p>2</p></th>
            <td class="align-middle"><p>Fusions Volunteer</p></td>
            <td class="align-middle">
              <div class="d-grid gap-2 d-md-block">
                <button type="button" class="btn btn-danger mx-2 text-white">
                  Delete
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <th class="align-middle" scope="row"><p>3</p></th>
            <td class="align-middle"><p>Fusions Volunteer</p></td>
            <td class="align-middle">
              <div class="d-grid gap-2 d-md-block">
                <button type="button" class="btn btn-danger mx-2 text-white">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-end">
      <li class="page-item">
        <a class="page-link" href="#"
          ><svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.41 1.41L6 0L0 6L6 12L7.41 10.59L2.83 6L7.41 1.41Z"
              fill="#023366"
            />
          </svg>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">...</a></li>
      <li class="page-item"><a class="page-link" href="#">50</a></li>
      <li class="page-item">
        <a class="page-link" href="#"
          ><svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-8.7738e-05 10.59L1.40991 12L7.40991 6L1.40991 0L-8.7738e-05 1.41L4.57991 6L-8.7738e-05 10.59Z"
              fill="#023366"
            />
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup(props, context) {
    const router = useRouter();

    return {};
  },
};
</script>

<style scoped>
.form-control {
  border-radius: 100px;
}
button span {
  font-family: NotoSansKR;
  color: #505d7c;
}
</style>
