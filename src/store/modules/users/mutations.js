export default {
    setIsSuccess(state, payload){
        state.isSuccess = payload;
    },
    setResponse(state, payload){
        state.response = payload;
    },
    setSuccessMsg(state, payload){
        state.successMsg = payload;
    },
    setErrMsg(state, payload){
        state.errMsg = payload;
    },
    setIsDataLoaded(state, payload){
        state.isDataLoaded = payload;
    },
    setTotalValue(state, payload){
        state.totalValue = payload;
    },
    setUser(state, payload){
        state.user = payload;
    },
    setUsers(state, payload){
        state.users = payload;
    },

    setIsPlanUploaded(state, payload){
        state.isPlanUploaded = payload;
    },
    setPlanFilePath(state, payload){
        state.planFilePath = payload;
    },

    setIsContractUploaded(state, payload){
        state.isContractUploaded = payload;
    },
    setContractFilePath(state, payload){
        state.contractFilePath = payload;
    },

    setIsAgreementUploaded(state, payload){
        state.isAgreementUploaded = payload;
    },
    setAgreementFilePath(state, payload){
        state.agreementFilePath = payload;
    },

    setRegisRequests(state, payload){
        state.regisRequests = payload;
    },
    setIsSubmit(state, payload){
        state.isSubmit = payload;
    },
};