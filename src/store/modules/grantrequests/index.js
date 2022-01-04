import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default{
    namespaced: true,
    state() {
        return {
            grant_requests: [],
            grant_request: null,
            grantUsers: [],
            grantUser: null,
            isDataLoaded: false,
            totalValue: 0,
            isLoading: false,
            isSubmit: false,
            downloadedItem: null,
            response: null
        };
    },
    mutations, //* Same with mutations: mutations
    actions, //* Same with actions: actions
    getters //* Same with getters: getters
}