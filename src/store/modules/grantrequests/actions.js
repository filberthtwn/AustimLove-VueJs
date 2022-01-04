import axios from "axios";

export default {
  getAllGrantUser(context, payload) {
    context.commit("setIsDataLoaded", false);

    axios
      .get(`${this.state.baseUrl}/api/v1/grant-requests/grant-user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: payload,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);

        const responseData = response.data.data.users;
        const grantUsers = [];
        for (const key in responseData) {
          const grantUser = {
            id: responseData[key]._id,
            name: responseData[key].name,
            email: responseData[key].email,
            phoneNumber: responseData[key].phone_number,
            birthdate: responseData[key].birthdate,
            role: responseData[key].role,
            bankName: responseData[key].bank_name,
            bankAccountNumber: responseData[key].bank_account_number,
            contract_period_start: responseData[key].contract_period_start,
            contract_period_end: responseData[key].contract_period_end,
          };
          grantUsers.push(grantUser);
        }
        context.commit("setGrantUsers", grantUsers);
        
        
        context.commit("setIsDataLoaded", true);
        context.commit("setTotalValue", response.data.data.total_value);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  /// Get all grant request with "WAITING" status
  getAllNewGrantRequest(context, payload){
    context.commit("setIsDataLoaded", false);
    axios
      .get(`${this.state.baseUrl}/api/v1/grant-requests/new`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: payload,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);

        const grantRequests = response.data.data.grant_requests;

        console.log("=====");
        console.log(grantRequests.length);
        console.log("=====");

        context.commit("setRequests", grantRequests);
        context.commit("setIsDataLoaded", true);
        context.commit("setTotalValue", response.data.data.total_value);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  getGrantUserDetail(context, payload) {
    context.commit("setGrantUser", null);
    axios
      .get(`${this.state.baseUrl}/api/v1/users/${payload.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(function (response) {
        const responseData = response.data.data.user;
        const grantUser = {
          id: responseData._id,
          name: responseData.name,
          email: responseData.email,
          phoneNumber: responseData.phone_number,
          birthdate: responseData.birthdate,
          role: responseData.role,
          bankName: responseData.bank_name,
          bankAccountNumber: responseData.bank_account_number,
          contract_period_start: responseData.contract_period_start,
          contract_period_end: responseData.contract_period_end,
          volunteer: responseData.volunteer,
          supportAgent: responseData.support_agent,
        };
        console.log(grantUser);
        context.commit("setGrantUser", grantUser);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  getAllRequest(context, payload) {
    context.commit("setIsDataLoaded", false);
    axios
      .get(`${this.state.baseUrl}/api/v1/grant-requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: payload,
      })
      .then(function (response) {
        const responseData = response.data.data.grant_requests;
        const requests = [];
        for (const key in responseData) {
          const request = {
            id: responseData[key]._id,
            status: responseData[key].status,
            request_reason: responseData[key].request_reason,
            requester: responseData[key].requester.name,
            created_at: responseData[key].created_at,
          };
          requests.push(request);
        }
        console.log(requests);
        context.commit("setIsDataLoaded", true);
        context.commit("setRequests", requests);
        context.commit("setTotalValue", response.data.data.total_value);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  getRequestDetail(context, payload) {
    context.commit("setRequest", null);
    axios
      .get(
        `${this.state.baseUrl}/api/v1/grant-requests/${payload.request_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        const responseData = response.data.data.grant_request;
        const request = {
          id: responseData._id,
          status: responseData.status,
          created_at: responseData.created_at,
          request_reason: responseData.request_reason,
          requester: responseData.requester,
          bank_name: responseData.bank_name,
          bank_account_name: responseData.bank_account_name,
          bank_account_number: responseData.bank_account_number,
          images_of_proof: responseData.images_of_proof,
        };
        console.log(request);
        context.commit("setRequest", request);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
  updateRequest(context, payload) {
    console.log(payload);
    console.log("token: " + localStorage.getItem("token"));
    context.commit('setIsSubmit', true);
    axios
      .patch(
        `${this.state.baseUrl}/api/v1/grant-requests/${payload.id}`,
        {
          action: payload.action,
          rejected_reason: payload.rejected_reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        
        context.commit('setIsSubmit', false);
        context.commit('setResponse', response.data);
      })
      .catch(function (error) {
        context.commit('setIsSubmit', false);
        context.commit('setResponse', error.response.data);

        console.log(error);
        console.log(error.response.data.message);
      });
  },
  getGrantRequestDownloadLink(context, payload){
    context.commit("setDownloadedItem", null);
    axios
      .get(
        `${this.state.baseUrl}/api/v1/grant-requests/download?${payload.request_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log("download link: " + response.data.data.path);
        const responseData = response.data.data;
        let path = responseData.path;
        path = "../" + path.replace('public/','');
        const request = {
          path: path
        };
        console.log(request);
        context.commit("setDownloadedItem", request);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  reset(context) {
    context.commit("setTotalValue", 0);
  },
};
