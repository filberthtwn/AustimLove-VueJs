import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default{
    namespaced: true,
    state() {
        return {
            totalValue: 0,
            isDataLoaded: false,
            imageUrl: null,
            notifications: [],
            adminNotifications: [],
            response: null,
            isUpdateNotif: false,
        };
    },
    mutations, //* Same with mutations: mutations
    actions, //* Same with actions: actions
    getters //* Same with getters: getters
}