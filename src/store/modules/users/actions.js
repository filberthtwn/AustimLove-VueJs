import axios from "axios";

export default {
  async updateUserStatus(context, payload) {
    let userId = payload.userId;
    delete payload.userId;

    let params = payload;
    const request = await axios
      .patch(
        `${this.state.baseUrl}/api/v1/users/${userId}/status`,
        params, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        const responseData = response.data;
        context.commit("setIsSuccess", responseData.success);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  updateUser(context, payload) {
    context.commit("setSuccessMsg", null);

    console.log("(DEBUG) PAYLOAD");
    console.log(payload);

    let userId = payload.user_id;
    delete payload.userId;

    let params = payload;
    axios
      .patch(
        `${this.state.baseUrl}/api/v1/users/${userId}`,
        params, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        
        context.commit('setResponse', response.data);

        const responseData = response.data;
        console.log(response.data.message);
        context.commit("setSuccessMsg", responseData.message);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  async getAllRegisRequest(context, payload) {
    context.commit("setIsDataLoaded", false);

    const response = await axios.get(`${this.state.baseUrl}/api/v1/users/register-requests?sort=+created_at`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        page: payload.page,
        limit: payload.limit
      },
    })

    console.log("PARAMS =>", payload);

    console.log(response);

    const responseData = response.data.data;
    var registerRequests = [];
    for (const key in responseData.register_requests) {
      const registerRequest = {
        id: responseData.register_requests[key]._id,
        name: responseData.register_requests[key].name,
        role: responseData.register_requests[key].role,
        createdAt: responseData.register_requests[key].created_at,
      };
      registerRequests.push(registerRequest);
    }

    console.log(registerRequests)

    context.commit('setTotalValue', response.data.data.total_value);
    context.commit('setRegisRequests', registerRequests);
    context.commit('setIsDataLoaded', true)
  },

  getUserDetail(context, payload) {
    context.commit('setUser', null);
    axios.get(`${this.state.baseUrl}/api/v1/users/${payload.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(function (response) {
        console.log(response.data);

        const responseData = response.data.data.user;
        const user = {
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
          trust_bank_name: responseData.trust_bank_name,
          trust_bank_account_number: responseData.trust_bank_account_number,
          volunteer: responseData.volunteer,
          supportAgent: responseData.support_agent,
          plan_file_path: responseData.plan_file_path,
          contract_file_path: responseData.contract_file_path,
          user_agreement_file_path: responseData.user_agreement_file_path,
          is_active: responseData.is_active,
        }
        console.log(user);
        context.commit('setUser', user)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  terminateUser(context, payload) {
    axios.patch(`${this.state.baseUrl}/api/v1/users/${payload.user_id}/terminate`, null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(function (response) {
        console.log(response.data);

        const responseData = response.data;
        context.commit('setSuccessMsg', responseData.message)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  unterminateUser(context, payload) {
    axios.patch(`${this.state.baseUrl}/api/v1/users/${payload.user_id}/unterminate`, null, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(function (response) {
        console.log(response.data);

        const responseData = response.data;
        context.commit('setSuccessMsg', responseData.message)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  uploadPlan(context, payload) {
    context.commit('setIsPlanUploaded', null);
    if (!payload) {
      context.commit('setPlanFilePath', null);
      context.commit('setIsPlanUploaded', true);
      return
    }

    axios.post(`${this.state.baseUrl}/api/v1/upload/plan`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(function (response) {
        console.log(response.data)
        if (response.data.success) {
          context.commit('setPlanFilePath', response.data.data.path);
          context.commit('setIsPlanUploaded', true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  uploadContract(context, payload) {
    console.log("PARAMS =>");
    console.log(payload);

    context.commit('setIsContractUploaded', false);

    if (!payload) {
      context.commit('setContractFilePath', null);
      context.commit('setIsContractUploaded', true);
      return;
    }

    axios.post(`${this.state.baseUrl}/api/v1/upload/contract`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(function (response) {
        console.log(response.data)
        if (response.data.success) {
          context.commit('setContractFilePath', response.data.data.path);
          context.commit('setIsContractUploaded', true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  uploadAgreement(context, payload) {
    console.log("PARAMS =>");
    console.log(payload);

    context.commit('setIsAgreementUploaded', false);

    if (!payload) {
      context.commit('setAgreementFilePath', null);
      context.commit('setIsAgreementUploaded', true);
      return;
    }

    axios.post(`${this.state.baseUrl}/api/v1/upload/user-agreement`, payload, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      .then(function (response) {
        console.log(response.data)
        if (response.data.success) {
          context.commit('setAgreementFilePath', response.data.data.path);
          context.commit('setIsAgreementUploaded', true);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  reset(context) {
    context.commit('setIsSuccess', false)
    context.commit('setTotalValue', 0)
    context.commit('setSuccessMsg', null)

    context.commit('setRegisRequests', [])
    context.commit("setTotalValue", 0);
    context.commit("setIsDataLoaded", true);
  },

  getAllUser(context, payload) {
    context.commit("setIsDataLoaded", false);

    let params = {};
    if (payload) {
      if (payload.role) {
        params["role"] = payload.role;
      }
    }
    console.log(payload);
    axios
      .get(`${this.state.baseUrl}/api/v1/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: payload,
      })
      .then(function (response) {
        console.log(response);
        console.log(response.data);

        const responseData = response.data.data.users;
        const users = [];
        for (const key in responseData) {
          const user = {
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
            volunteer: responseData[key].volunteer,
            supportAgent: responseData[key].support_agent,
          };
          users.push(user);
        }
        context.commit("setTotalValue", response.data.data.total_value);
        context.commit("setUsers", users);
        context.commit("setIsDataLoaded", true);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  assignVolunteer(context, payload) {
    context.commit("setIsSubmit", true);
    let userId = payload.id;
    console.log("user id: " + userId);
    let params = payload;
    console.log("volunteer id: " + payload.volunteer_id);

    console.log("PARAMS");
    console.log(params);
    axios
      .patch(
        `${this.state.baseUrl}/api/v1/users/link/${userId}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        context.commit("setResponse", response.data);
        context.commit("setIsSubmit", false);
        const responseData = response.data;
        console.log(responseData.message);
        // location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  assignSupportAgent(context, payload) {
    context.commit("setIsSubmit", true);
    let userId = payload.id;
    console.log("user id: " + userId);
    let params = payload;
    console.log("(DEBUG) PAYLOAD", payload);
    console.log("support agent id: " + payload.support_agent_id);
    axios
      .patch(
        `${this.state.baseUrl}/api/v1/users/link/${userId}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        context.commit("setResponse", response.data);
        context.commit("setIsSubmit", false);
        const responseData = response.data;
        console.log(responseData.message);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  reassignUser(context, payload){
    context.commit("setIsSubmit", true);

    let params = payload;
    console.log("PARAMS =>");
    console.log(params);

    axios.patch(
        `${this.state.baseUrl}/api/v1/users/relink/${payload.id}`,
        params,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        context.commit("setResponse", response.data);
        context.commit("setIsSubmit", false);
        location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  resetIsSuccess(context, payload){
    context.commit("setIsSuccess", false);
  },
  
  updateVolunteer(context, payload) {
    console.log(payload);
    let userId = payload._id;
    delete payload.userId;
    let params = payload;
    console.log("token: " + localStorage.getItem("token"));
    console.log(params);
    context.commit('setIsSubmit', true);
    const request = axios
      .patch(
        `${this.state.baseUrl}/api/v1/users/${userId}`,
        params, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        context.commit('setResponse', response.data);

        if (response.data.success) {
          context.commit('setIsSubmit', false);
          console.log("success!!");
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.message);
      });
  },

  updateSupportAgent(context, payload) {
    console.log(payload);
    let userId = payload._id;
    delete payload.userId;
    let params = payload;
    console.log("token: " + localStorage.getItem("token"));
    console.log(params);
    context.commit('setIsSubmit', true);
    const request = axios
      .patch(
        `${this.state.baseUrl}/api/v1/users/${userId}`,
        params, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);

        context.commit('setResponse', response.data);

        if (response.data.success) {
          context.commit('setIsSubmit', false);
          console.log("success!!");
        }
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.message);
      });
  },

};
