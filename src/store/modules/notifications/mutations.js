export default {
    setNotifications(state, payload){
        state.notifications = payload;
    },
    setIsDataLoaded(state, payload){
        state.isDataLoaded = payload;
    },
    setImageUrl(state, payload){
        state.imageUrl = payload;
    },
    setTotalValue(state, payload){
        state.totalValue = payload;
    },
    setIsSubmit(state, payload){
        state.isSubmit = payload;
    },
    setAdminNotifications(state, payload){
        state.adminNotifications = payload;
    },
    setResponse(state, payload){
        state.response = payload;
    },
    setIsUpdateNotif(state, payload){
        state.isUpdateNotif = payload;
    }
};