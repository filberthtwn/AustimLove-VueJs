import axios from 'axios';

export default {
    getAllAnnouncement(context, payload){
        context.commit('setIsDataLoaded', false);
        axios.get(`${this.state.baseUrl}/api/v1/announcements`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(function (response) {
            console.log(response.data);
            
            const responseData = response.data.data.announcements;
            const announcements = [];
            for (const key in responseData) {
                const announcement = {
                    id: responseData[key]._id,
                    title: responseData[key].title,
                    content: responseData[key].content,
                    createdAt: responseData[key].created_at,
                }
                announcements.push(announcement);
            }
            context.commit('setTotalValue', response.data.data.total_value);
            context.commit('setIsDataLoaded', true);
            context.commit('setAnnouncements', announcements)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },
    
    createAnnouncement(context, payload){
        console.log(payload);

        context.commit('setIsLoading', true);
        axios.post(`${this.state.baseUrl}/api/v1/announcements`,{
            'title': payload.title,
            'content': payload.content
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data.success){
                context.commit('setIsLoading', false);
                context.dispatch('loadAnnouncements');
            }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    updateAnnouncement(context, payload){
        console.log(payload);
        context.commit('setIsLoading', true);
        axios.patch(`${this.state.baseUrl}/api/v1/announcements/${payload.id}`,{
            'title': payload.title,
            'content': payload.content
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(function (response) {
            context.commit('setResponse', response.data);
            context.commit('setIsLoading', false);
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    deleteAnnouncement(context, payload){
        console.log(payload);
        context.commit('setIsLoading', true);
        axios.delete(`${this.state.baseUrl}/api/v1/announcements/${payload.id}`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data.success){
                context.commit('setIsSuccess', false);
                context.dispatch('loadAnnouncements');
            }
            context.commit('setIsLoading', false);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};