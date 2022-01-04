export default {
    setPopups(state, payload){
        state.popups = payload;
    },
    setResponse(state, payload){
        state.response = payload;
    },
    setPopup(state, payload){
        state.popup = payload;
    },
    setImageUrl(state, payload){
        state.imageUrl = payload;
    },
    setIsDataLoaded(state, payload){
        state.isDataLoaded = payload;
    },
    setTotalValue(state, payload){
        state.totalValue = payload;
    },
    setIsSubmit(state, payload){
        state.isSubmit = payload;
    }
};