export default {
    isSuccess(state){
        return state.isSuccess;
    },
    response(state){
        return state.response;
    },
    isDataLoaded(state){
        return state.isDataLoaded;
    },
    totalValue(state){
        return state.totalValue;
    },
    transactions(state){
        return state.transactions;
    },
    transFilePaths(state){
        return state.transFilePaths;
    },
    isUploadSuccess(state){
        return state.isUploadSuccess;
    }
};