import axios from 'axios';
import firebase from '../../../../firebaseConfig.js';

const currentUser = JSON.parse(localStorage.getItem('userDetail'));
const db = firebase.firestore();

export default {
    
    getAllNotification(context, payload){
        context.commit('setIsDataLoaded', false);
        console.log("PARAMS =>");
        console.log(payload);
        axios.get(`${this.state.baseUrl}/api/v1/notifications`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: payload,
        })
        .then(function (response) {
            console.log(response.data);

            const responseData = response.data.data.notifications;
            const notifications = [];
            for (const key in responseData) {
                const notification = {
                    id: responseData[key]._id,
                    title: responseData[key].title,
                    content: responseData[key].content,
                    link: responseData[key].link,
                    imageUrl: responseData[key].image_url,
                    createdAt: responseData[key].created_at,
                }
                notifications.push(notification);
            }
            context.commit('setTotalValue', response.data.data.total_value);
            context.commit('setIsDataLoaded', true);
            context.commit('setNotifications', notifications);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    uploadNotifImage(context, payload){
        console.log("PARAMS =>");
        console.log(payload);

        context.commit('setIsSubmit', true);
        axios.post(`${this.state.baseUrl}/api/v1/upload/notification`, payload, {
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

    createNotif(context, payload){
        console.log(payload);

        context.commit('setIsSubmit', true);
        axios.post(`${this.state.baseUrl}/api/v1/notifications`,{
            'title': payload.title,
            'content': payload.content,
            'link': payload.link,
            'image_url': payload.image_url
        },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            if (response.data.success){
                context.commit('setIsSubmit', false);
                context.dispatch('getAllNotification');
            }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    getAllAdminNotification(context, payload){
        axios.get(`${this.state.baseUrl}/api/v1/notifications/admin`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: payload,
        })
        .then(function (response) {
            const adminNotification = response.data.data.notifications;
            console.log(adminNotification);
            context.commit('setAdminNotifications', adminNotification);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    updateAdminNotification(context, payload){
        axios.patch(`${this.state.baseUrl}/api/v1/notifications/admin/${payload.id}`,
        {
            is_read: payload.is_read
        }, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(function (response) {
            context.commit('setResponse', response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    listenNewNotification(context, payload){
        const isUpdateNotifRef = db.collection('utils').doc('is_update_notif');
        isUpdateNotifRef.onSnapshot(doc =>  {
            if(!doc){ return }

            const isUpdateNotif = doc.data();
            if(isUpdateNotif){
                isUpdateNotifRef.update({
                    value: false
                })
                context.commit('setIsUpdateNotif', isUpdateNotif.value);
            }
        });
    }
};