export default {
    setDialogs(state, payload){
        state.dialogs = payload;
    },
    setMessages(state, payload){
        state.messages = payload;
    },
    setIsDataLoaded(state, payload){
        state.isDataLoaded = payload;
    },
    setTotalValue(state, payload){
        state.totalValue = payload;
    },
    setIsSuccess(state, payload){
        state.isSuccess = payload;
    },
    setSelectedRoomId(state, payload){
        state.selectedRoomId = payload;
    }
};