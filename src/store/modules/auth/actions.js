import axios from 'axios';

export default {
    login(context, payload){
        console.log('PARAMS =>');
        console.log(payload);

        context.commit('setIsSubmit', true);
        axios.post(`${this.state.baseUrl}/api/v1/login-admin`, payload)
        .then(function (response) {
            console.log("RESPONSE =>");
            console.log(response.data);

            //* Save token to localStorage
            localStorage.setItem('token', response.data.data.token);

            //* Save user detail to localStorage
            localStorage.setItem('userDetail', JSON.stringify(response.data.data.user));

            context.commit('setIsSubmit', false);
        })
        .catch(function (error) {
          context.commit('setErrMsg', error.response.data.message)
          console.log(error);
        });
    },

    changePassword(context, payload){
        console.log('PARAMS =>');
        console.log(payload);

        context.commit('setSuccessMsg', null);
        context.commit('setErrMsg', null);
        axios.patch(`${this.state.baseUrl}/api/v1/change-password`, payload,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(function (response) {
            console.log("RESPONSE =>");
            console.log(response.data);

            //* Save token to localStorage
            localStorage.setItem('token', response.data.data.token);
            context.commit('setSuccessMsg', response.data.message);
        })
        .catch(function (error) {
          context.commit('setErrMsg', error.response.data.message)
          console.log(error);
        });
    },

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userDetail');
    },

    reset(context){
        context.commit('setIsSubmit', false);
        context.commit('setSuccessMsg', null);
        context.commit('setErrMsg', null);
    }
};