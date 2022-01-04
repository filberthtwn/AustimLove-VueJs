import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default{
    namespaced: true,
    state() {
        return {
            isSuccess: false,
            successMsg: null,
            errMsg: null,
            isDataLoaded: false,
            totalValue: 0,
            users: [],
            user: null,
            volunteer: {
                name: '-'
            },
            supportAgent: {
                name: '-'
            },
            regisRequests: [],

            isPlanUploaded: false,
            planFilePath: null,
            
            isContractUploaded: false,
            contractFilePath: null,

            isAgreementUploaded: false,
            agreementFilePath: null,
        };
    },
    mutations, //* Same with mutations: mutations
    actions, //* Same with actions: actions
    getters //* Same with getters: getters
}