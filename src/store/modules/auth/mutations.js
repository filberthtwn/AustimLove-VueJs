export default {
    setAnnouncements(state, payload){
        state.announcements = payload;
    },
    setIsSubmit(state, payload){
        state.isSubmit = payload;
    },
    setTotalValue(state, payload){
        state.totalValue = payload;
    },
    setSuccessMsg(state, payload){
        state.successMsg = payload;
    },
    setErrMsg(state, payload){
        state.isSubmit = false;
        state.errMsg = payload;
    },
    setIsSuccess(state, payload){
        state.isSuccess = payload;
    }
};