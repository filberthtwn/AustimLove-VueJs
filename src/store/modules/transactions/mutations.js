export default {
    setIsSuccess(state, payload){
        state.success = payload;
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
    setTransactions(state, payload){
        state.transactions = payload;
    },
    setTransFilePaths(state, payload){
        state.transFilePaths = payload;
    },
    setIsUploadSuccess(state, payload){
        state.isUploadSuccess = payload;
    },
};