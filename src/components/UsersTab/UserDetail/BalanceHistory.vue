<template>
  <div class="card my-4">
    <div class="card-body">
      <table class="table regis-table">
        <thead>
          <tr>
            <th scope="col" class="bold">Datetime</th>
            <th scope="col" class="bold">Withdrawal</th>
            <th scope="col" class="bold">Deposit</th>
            <th scope="col" class="bold">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="align-middle" scope="row"><p>2021-01-01 00:59:59</p></th>
            <td class="align-middle"><p>₩ 5,000</p></td>
            <td class="align-middle"><p>₩ 0</p></td>
            <td class="align-middle"><p>₩ 5,000</p></td>
          </tr>
           <tr>
            <th class="align-middle" scope="row"><p>2021-01-01 00:59:59</p></th>
            <td class="align-middle"><p>₩ 5,000</p></td>
            <td class="align-middle"><p>₩ 0</p></td>
            <td class="align-middle"><p>₩ 5,000</p></td>
          </tr>
           <tr>
            <th class="align-middle" scope="row"><p>2021-01-01 00:59:59</p></th>
            <td class="align-middle"><p>₩ 5,000</p></td>
            <td class="align-middle"><p>₩ 0</p></td>
            <td class="align-middle"><p>₩ 5,000</p></td>
          </tr>
           <tr>
            <th class="align-middle" scope="row"><p>2021-01-01 00:59:59</p></th>
            <td class="align-middle"><p>₩ 5,000</p></td>
            <td class="align-middle"><p>₩ 0</p></td>
            <td class="align-middle"><p>₩ 5,000</p></td>
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
import { computed } from "vue";

export default {
  props: {
    query: String,
  },
  setup(props, context) {
    // const filteredTitles = computed(() => {
    //   console.log(props.query.toLowerCase());
    //   return titles.filter((s) =>
    //     s.Name.toLowerCase().includes(props.query.toLowerCase())
    //   );
    // });

    return {};
  },
};
</script>
