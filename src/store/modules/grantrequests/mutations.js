export default {
    setRequests(state, payload){
        state.grant_requests = payload;
    },
    setRequest(state, payload){
        state.grant_request = payload;
        // console.log("test 2");
    },
    setGrantUsers(state, payload){
        state.grantUsers = payload;
    },
    setGrantUser(state, payload){
        state.grantUser = payload;
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
    },
    setIsSubmit(state, payload){
        state.isSubmit = payload;
    },
    setDownloadedItem(state, payload){
        state.downloadedItem = payload;
    },
    setResponse(state, payload){
        state.response = payload;
    }
};