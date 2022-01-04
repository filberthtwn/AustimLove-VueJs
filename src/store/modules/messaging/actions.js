import axios from "axios";
import firebase from '../../../../firebaseConfig.js';

const currentUser = JSON.parse(localStorage.getItem('userDetail'));
const db = firebase.firestore();

export default {
  async getAllDialog(context, payload) {
    const snapshot = await db.collection('messaging').get();
    let dialogs = [];
    console.log("dialogs");
    snapshot.forEach(doc => {
      if (doc.data().occupants.some(val => val.id == currentUser._id)){
        const dialog = {
          id: doc.id,
          messages: doc.data().messages,
          occupants: doc.data().occupants,
        }
        dialogs.push(dialog);
      }
    });
    console.log(dialogs);
    context.commit('setDialogs', dialogs);
    context.commit('setIsDataLoaded', true);
  },

  getAllMessage(context, payload){
    const doc = db.collection('messaging').doc(payload.id);
    var messages = [];
    doc.onSnapshot(docSnapshot => {
      messages = docSnapshot.data().messages;
      context.commit('setMessages', messages);
    }, err => {
      console.log(`Encountered error: ${err}`);
    });
  },

  createMessage(context, payload){
      axios.post(`${this.state.baseUrl}/api/v1/chats/send`, payload,{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }, 
      })
      .then(function (response) {
          console.log(response.data)
          // if (response.data.success){
          //     context.commit('setIsSubmit', false);
          //     context.dispatch('getAllNotification');
          // }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },

  sendFileMessage(context, payload){
    axios.post(`${this.state.baseUrl}/api/v1/chats/send-file`, payload,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }, 
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
      console.log(`Encountered error: ${error}`);
    });
  },

  sendImageMessage(context, payload){
    axios.post(`${this.state.baseUrl}/api/v1/chats/send-image`, payload,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
        }, 
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
      console.log(`Encountered error: ${error}`);
    });
  },

  setSelectedroomId(context, payload){
    console.log("(DEBUG) SET SELECTED ROOM ID");
    console.log(payload.roomId);
    context.commit('setSelectedRoomId', payload.roomId);
  }
};
