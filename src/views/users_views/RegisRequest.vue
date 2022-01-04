<template>
    <base-modal :isShow="showPopup">
        <div class="d-flex flex-column p-3">
            <h5 class="text-center font-regular">{{ $strings.USER_HAS_BEEN_SUCESSFULLY_REGISTERED() }}</h5>
            <h5 class="text-center mb-4">{{ $strings.PLEASE_INPUT_DOCUMENT_REQUIRED() }}.</h5>
            <div class="d-flex mx-auto gap-3">
                <button class="btn btn-outline-primary" style="width: 150px" @click="doLater">
                    아니요
                </button>
                <button class="btn btn-primary" style="width: 150px" @click="setNow(selectedId)">
                    네
                </button>
            </div>
        </div>
    </base-modal>

    <user-tab-layout :activeItem="'regis'">
        <div>
            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-4">
                            <p>총: {{ totalValue }}</p>
                        </div>
                        <div class="col-8 ms-auto">
                            <div class="dropdown d-flex justify-content-end">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
                                    <span>{{ showSortByText(role) }}</span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#" @click="selectRole(null)">{{ $strings.ALL() }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click="selectRole('USER')">{{ $strings.USER() }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click="selectRole('VOLUNTEER')">{{ $strings.VOLUNTEER() }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click="selectRole('SUPPORT_AGENT')">{{ $strings.SUPPORT_AGENCY() }}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table class="table gray">
                        <thead>
                            <tr>
                                <th scope="col" class="bold">가입일자</th>
                                <th scope="col" class="bold">성명</th>
                                <th scope="col" class="bold">사용자 구분</th>
                                <th scope="col" class="bold">상세보기</th>
                            </tr>
                        </thead>
                        <shimmer-cell :column="4" :row="5" v-if="!isDataLoaded" />
                        <tbody v-else>
                            <tr v-for="regisRequest in test" :key="regisRequest">
                                <th class="align-middle" scope="row">
                                    {{ formatDate(regisRequest.createdAt) }}
                                </th>
                                <td class="align-middle bold">
                                    {{ regisRequest.name }}
                                </td>
                                <td class="align-middle">
                                    {{ regisRequest.role }}
                                </td>
                                <td class="align-middle" style="width:25%">
                                    <div class="d-grid gap-2 d-md-block">
                                        <button type="button" class="btn btn-success mx-2 text-white" @click="updateUserStatus(regisRequest.id,'APPROVED')" style="width:100px" :disabled="isAcceptBtnDisabled(regisRequest)">
                                            <clip-loader :loading="true" :color="'#FFFFFF'" :size="'32px'" v-if="isAcceptLoading(regisRequest)"></clip-loader>
                                            <span class="text-white" v-else>승인</span>
                                        </button>
                                        <button type="button" class="btn btn-danger mx-2 text-white" @click="updateUserStatus(regisRequest.id,'REJECTED')" style="width:100px" :disabled="isRejectBtnDisabled(regisRequest)">
                                            <clip-loader :loading="true" :color="'#FFFFFF'" :size="'32px'" v-if="isRejectLoading(regisRequest)"></clip-loader>
                                            <span class="text-white" v-else>미승인</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <pagination :currentPage="currentPage" :totalPage="Math.ceil(totalValue/limit)" :callback="movePage" />
        </div>
    </user-tab-layout>
</template>

<script>
    import ClipLoader from "vue-spinner/src/ClipLoader.vue"
    import Pagination from "../../components/Pagination.vue"
    import ShimmerCell from "../../components/ShimmerCell.vue"
    import UsersTabLayout from "../../components/UsersTab/UsersTabLayout.vue"
    import moment from 'moment';

    export default {
        components: {
            'shimmer-cell': ShimmerCell,
            'user-tab-layout': UsersTabLayout,
            'pagination': Pagination,
            ClipLoader
        },

        props: {
            query: String,
        },

        data() {
            return {
                showPopup: false,
                role: null,
                limit: 10,
                currentPage: 1,
                selectedId: null,
                isModalShow: false,
                status: false,
                test: []
            }
        },

        computed: {
            isSuccess(){
                return this.$store.getters['users/isSuccess'];
            },
            isDataLoaded() {
                return this.$store.getters['users/isDataLoaded'];
            },
            regisRequests() {
                return this.$store.getters['users/regisRequests'];
            },
            totalValue() {
                return this.$store.getters['users/totalValue'];
            },
        },

        watch: {
            isSuccess(){
                if (this.isSuccess == true) {
                    
                    if (this.status == "APPROVED"){
                        this.showPopup = true;
                    }

                    /// Set selected registRequest id to null
                    this.selectedId = null;
                    this.status = null;

                    /// Set isSuccess data to false
                    this.$store.commit('users/setIsSuccess', false);

                    /// Reload grant request data
                    this.$store.dispatch('users/getAllRegisRequest', {
                        'page': 1,
                        'limit': 10,
                    });
                };
            },

            regisRequests(){
                this.test = this.regisRequests;
            },

            $route(to, from) {
                console.log("ABC");
                const {id, subId} = to.params
                console.log(subId);
                if (subId) {
                    
                } else {
                // do something else
                }
            }
        },

        methods: {
            setNow(userId){
                this.$router.push({
                    name: 'UserInfo',
                    params: {
                        id: userId 
                    } 
                })
            },
            doLater(){
                this.selectedId = null;
                this.showPopup = false;
            },

            showSortByText(sortBy){
                switch (sortBy) {
                    case 'USER':
                        return this.$strings.USER()
                    case 'VOLUNTEER':
                        return this.$strings.VOLUNTEER()
                    case 'SUPPORT_AGENT':
                        return this.$strings.SUPPORT_AGENCY()
                    default:
                        return this.$strings.ALL()
                }
            },

            getAllRegisRequest() {
                let params = {
                    'limit': this.limit,
                    'page': this.currentPage,
                };

                if (this.role) {
                    params['role'] = this.role
                };

                this.$store.dispatch('users/getAllRegisRequest', params);
            },

            formatDate(dateString) {
                return moment(dateString).format('YYYY-MM-DD HH:mm:ss');
            },

            movePage(page) {
                this.currentPage = page;
                this.getAllRegisRequest();
            },

            selectRole(role) {
                this.role = role;
                this.getAllRegisRequest();
            },

            updateUserStatus(userId, status) {
                this.selectedId = userId;
                this.status = status;
                this.$store.dispatch('users/updateUserStatus', {
                    'userId': userId,
                    'status': status
                });
            },

            isAcceptLoading(regisRequest){
                if(regisRequest.id == this.selectedId && this.status == 'APPROVED'){
                    return true
                }
                return false
            },

            isRejectLoading(regisRequest){
                if(regisRequest.id == this.selectedId && this.status == 'REJECTED'){
                    return true
                }
                return false
            },

            isAcceptBtnDisabled(regisRequest){
                if(!this.selectedId){
                    return false;
                }

                /// Disable Reject Button when action is APPROVE
                if(regisRequest.id == this.selectedId && this.status == 'REJECTED'){
                    return true
                }

                /// Disable Reject Button when current selected Id is not this id
                if(regisRequest.id != this.selectedId){
                    return true
                }

                return false
            },

            isRejectBtnDisabled(regisRequest){
                if(!this.selectedId){
                    return false;
                }
                
                /// Disable Reject Button when action is APPROVE
                if(regisRequest.id == this.selectedId && this.status == 'APPROVED'){
                    return true
                }

                /// Disable Reject Button when current selected Id is not this id
                if(regisRequest.id != this.selectedId){
                    return true
                }
                return false
            }
        },

        created() {
            this.getAllRegisRequest();
        },

        beforeUnmount() {
            this.$store.dispatch('users/reset');
        }
    };
</script>

<style scoped>
    button span {
        font-family: NotoSansKR;
        color: #505d7c;
    }
</style>