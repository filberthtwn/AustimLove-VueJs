<template>
    <user-detail-layout :activeItem="'balancehistory'">
        <template v-slot:content="">
            <div>
                <div class="card my-4">
                <div class="card-body">
                    <table class="table regis-table">
                        <thead>
                            <tr>
                                <th scope="col" class="bold">일시</th>
                                <th scope="col" class="bold">출금</th>
                                <th scope="col" class="bold">입금</th>
                                <th scope="col" class="bold">잔액</th>
                            </tr>
                        </thead>

                        <!-- SHIMMER CONTENT -->
                        <shimmer-cell :column="4" :row="5" v-if="!isDataLoaded" />
                        <!-- END SHIMMER CONTENT -->

                        <tbody v-for="transaction in transactions" :key="transaction" v-else>
                            <tr>
                                <th class="align-middle py-4" scope="row">
                                    <p>{{ transaction.date }}</p>
                                </th>
                                <td class="align-middle">
                                    <p>₩ {{ $currencyFilters.formatCurrency(transaction.withdrawAmount) }}</p>
                                </td>
                                <td class="align-middle">
                                    <p>₩ {{ $currencyFilters.formatCurrency(transaction.depositAmount) }}</p>
                                </td>
                                <td class="align-middle">
                                    <p>₩ {{ $currencyFilters.formatCurrency(transaction.lastBalance) }}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <pagination :currentPage="currentPage" :totalPage="Math.ceil(totalValue/limit)" :callback="movePage" />
            </div>
        </template>
    </user-detail-layout>
</template>

<script>
    import Pagination from "../../components/Pagination.vue"
    import UserDetailLayout from "../../layouts/UserDetailLayout.vue";
    import ShimmerCell from "../../components/ShimmerCell.vue"

    export default {
        props: ['id'],

        components: {
            'user-detail-layout': UserDetailLayout,
            'shimmer-cell': ShimmerCell,
            'pagination': Pagination
        },

        data() {
            return {
                limit: 10,
                currentPage: 1,
                searchQuery: "",
                sortBy: "USER",
            }
        },

        computed: {
            transactions() {
                return this.$store.getters['transactions/transactions'];
            },

            isDataLoaded() {
                return this.$store.getters['transactions/isDataLoaded'];
            },

            totalValue() {
                return this.$store.getters['transactions/totalValue'];
            },
        },

        methods: {
            getAllTransactions(){
                this.$store.dispatch('transactions/getAllTransaction', {
                    'user_id': this.id,
                    'page': this.currentPage,
                    'limit': 10,
                    'sort': '-date'
                });
            },

             movePage(page) {
                this.currentPage = page;
                this.getAllTransactions();
            },
        },

        created() {
            this.getAllTransactions();
        },
    }
</script>