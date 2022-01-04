import axios from 'axios';

export default {
    getAllPopup(context, payload){
        context.commit('setIsDataLoaded', false);

        axios.get(`${this.state.baseUrl}/api/v1/popups`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: payload,
        })
        .then(function (response) {
            console.log(response.data);

            const responseData = response.data.data.popups;
            const popups = [];
            for (const key in responseData) {
                const popup = {
                    id: responseData[key]._id,
                    title: responseData[key].title,
                    link: responseData[key].link,
                    imageUrl: responseData[key].image_url,
                    isShow: responseData[key].is_show,
                    createdAt: responseData[key].created_at,
                }
                popups.push(popup);
            }
            context.commit('setTotalValue', response.data.data.total_value);
            context.commit('setIsDataLoaded', true);
            context.commit('setPopups', popups);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    createPopup(context, payload){
        console.log("PARAMS =>");
        console.log(payload);

        context.commit('setIsSubmit', true);
        axios.post(`${this.state.baseUrl}/api/v1/popups`, payload, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data.success){
                context.commit('setIsSubmit', false);
            }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    uploadPopupImage(context, payload){
        console.log("PARAMS =>");
        console.log(payload);

        context.commit('setIsSubmit', true);
        axios.post(`${this.state.baseUrl}/api/v1/upload/popup`, payload, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data.success){
                context.commit('setImageUrl', response.data.data.path);
            }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    updatePopup(context, payload){
        context.commit('setIsSubmit', true);
        // context.commit('setSuccessMsg', null);

        console.log("PARAMS =>");
        console.log(payload);

        let id = payload.id;
        delete payload.id;

        axios.patch(`${this.state.baseUrl}/api/v1/popups/${id}`, payload, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(function (response) {
            const responseData = response.data;
            if (responseData.success){
                context.commit('setIsSubmit', false);
            }
            context.commit('setResponse', response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    deletePopup(context, payload){
        console.log("PARAMS =>");
        console.log(payload);

        context.commit('setIsSubmit', true);
        axios.delete(`${this.state.baseUrl}/api/v1/popups/${payload.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data.success){
                context.commit('setIsSubmit', false);
            }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    }
};