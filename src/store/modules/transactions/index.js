import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default{
    namespaced: true,
    state() {
        return {
            response: null,
            totalValue: 0,
            isUploadSuccess: false,
            isDataLoaded: false,
            transactions: [],
            transFilePaths: [],
        };
    },
    mutations, //* Same with mutations: mutations
    actions, //* Same with actions: actions
    getters //* Same with getters: getters
}