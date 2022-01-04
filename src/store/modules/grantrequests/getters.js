export default {
  requests(state) {
    return state.grant_requests;
  },
  request(state) {
    if (state.grant_request == null) {
      state.grant_request = {
        id: "-",
        status: "-",
        creates_at: "-",
        request_reason: "-",
        requester: "-",
        bank_name: "-",
        bank_account_name: "-",
        bank_account_number: "-",
        images_of_proof: null,
      };
    }
    return state.grant_request;
  },
  isDataLoaded(state) {
    return state.isDataLoaded;
  },
  grantUsers(state) {
    return state.grantUsers;
  },
  grantUser(state) {
    if (state.grantUser == null) {
      state.grantUser = {
        id: "-",
        name: "-",
        email: "-",
        phoneNumber: "-",
        birthdate: "-",
        role: "-",
        bankName: "-",
        bankAccountNumber: "-",
        contract_period_start: "-",
        contract_period_end: "-",
      };
    }
    return state.grantUser;
  },
  totalValue(state) {
    return state.totalValue;
  },
  isLoading(state) {
    return state.isLoading;
  },
  isSuccess(state) {
    return state.isSuccess;
  },
  isSubmit(state) {
    return state.isSubmit;
  },
  downloadedItem(state) {
    if (state.downloadedItem == null) {
      state.downloadedItem = {
        path: "-",
      };
    }
    return state.downloadedItem;
  },
  response(state) {
    return state.response;
  },
};
