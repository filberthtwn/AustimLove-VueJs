export default {
    setAnnouncements(state, payload){
        state.announcements = payload;
    },
    setResponse(state, payload){
        state.response = payload;
    },
    setIsDataLoaded(state, payload){
        state.isDataLoaded = payload;
    },
    setTotalValue(state, payload){
        state.totalValue = payload;
    },
    setIsLoading(state, payload){
        state.isLoading = payload;
    },
    setIsSuccess(state, payload){
        state.isSuccess = payload;
    }
};