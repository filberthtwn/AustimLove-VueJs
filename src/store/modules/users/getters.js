export default {
    isSuccess(state){
        return state.isSuccess;
    },
    response(state){
        return state.response;
    },
    successMsg(state){
        return state.successMsg;
    },
    isDataLoaded(state){
        return state.isDataLoaded;
    },
    users(state){
        return state.users;
    },
    user(state){

        if (state.user == null){
            state.user = {
                id: '-',
                name: '-',
                email: '-',
                phoneNumber: '-',
                birthdate: '-',
                role: '-',
                bankName: '-',
                bankAccountNumber: '-',
                contract_period_start: '-',
                contract_period_end: '-',
                volunteer: null,
                supportAgent: null,
            }
        }
        if (state.user.supportAgent == null){
            state.user.supportAgent = state.supportAgent
        }
        if (state.user.volunteer == null){
            state.user.volunteer = state.volunteer
        }
        return state.user;
    },
    supportAgent(state){
        return state.supportAgent;
    },
    regisRequests(state){
        return state.regisRequests;
    },
    totalValue(state){
        return state.totalValue;
    },

    planFilePath(state){
        return state.planFilePath;
    },
    isPlanUploaded(state){
        return state.isPlanUploaded;
    },

    contractFilePath(state){
        return state.contractFilePath;
    },
    isContractUploaded(state){
        return state.isContractUploaded;
    },

    agreementFilePath(state){
        return state.agreementFilePath;
    },
    isAgreementUploaded(state){
        return state.isAgreementUploaded;
    },
    isSubmit(state){
        return state.isSubmit;
    },
};
