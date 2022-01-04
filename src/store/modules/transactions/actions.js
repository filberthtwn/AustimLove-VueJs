import axios from 'axios';

export default {
    getAllTransaction(context, payload = {}){
        context.commit('setIsDataLoaded', false)

        console.log("PARAMS => ");
        console.log(payload);
        axios.get(`${this.state.baseUrl}/api/v1/transactions`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: payload,
        })
        .then(function (response) {
            console.log(response.data);

            const responseData = response.data.data.transactions;
            const transactions = [];
            for (const data of responseData) {
                const transaction = {
                    id: data._id,
                    withdrawAmount: data.withdraw_amount,
                    depositAmount: data.deposit_amount,
                    lastBalance: data.last_balance,
                    date: data.date,
                }
                transactions.push(transaction);
            }
            context.commit('setTotalValue', response.data.data.total_value);
            context.commit('setIsDataLoaded', true)
            context.commit('setTransactions', transactions)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    getAllTransactionFile(context, payload){
        console.log("PARAMS => ");
        console.log(payload);

        axios.get(`${this.state.baseUrl}/api/v1/transactions/files`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: payload,
        })
        .then(function (response) {
            console.log(response.data);

            const responseData = response.data;
            const {filePaths} = responseData.data;

            context.commit('setTotalValue', response.data.data.total_value);
            context.commit('setTransFilePaths', filePaths)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    },

    uploadTransaction(context, payload){
        console.log("PARAMS =>");
        console.log(payload);

        context.commit('setIsUploadSuccess', false);
        axios.post(`${this.state.baseUrl}/api/v1/transactions`, payload, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }, 
        })
        .then(function (response) {
            console.log(response.data)
            context.commit('setResponse', response.data);
            if (response.data.success){
                context.commit('setIsUploadSuccess', true);
            }
        })
        .catch(function (error) {
            const errBody = error.response.data;
            context.commit('setResponse', errBody);
        });
    },

    reset(context){
        context.commit('setIsDataLoaded', false)
        context.commit('setTotalValue', 0)
        context.commit('setSuccessMsg', null)

        context.commit('setTransactions', [])
    }
};