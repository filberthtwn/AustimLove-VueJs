<template>
    <user-tab-layout :activeItem="'conn'">
        <div>
            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-4">
                            <form class="d-flex">
                                <input class="form-control rounded-pill me-2" 
                                type="search" 
                                placeholder="검색" 
                                aria-label="Search" 
                                v-model="searchQuery" 
                                @input="onSearch"/>
                            </form>
                        </div>
                        <div class="col-8 d-flex ms-auto">
                            <div class="d-flex ms-auto">
                                <p class="my-auto">{{ $strings.SORT_BY() }}:</p>
                                <div class="dropdown d-flex">
                                    <button class="btn btn-secondary ps-1 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>{{ showSortByText(sortBy) }}</span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item" href="#" @click="sortByRole('USER')">{{ $strings.USER() }}</a></li>
                                        <li><a class="dropdown-item" href="#" @click="sortByRole('VOLUNTEER')">{{ $strings.VOLUNTEER() }}</a></li>
                                        <li><a class="dropdown-item" href="#" @click="sortByRole('SUPPORT_AGENT')">{{ $strings.SUPPORT_AGENCY() }}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table gray">
                        <thead>
                            <tr>
                                <th scope="col">회원</th>
                                <th scope="col">연락처</th>
                                <th scope="col">지원자</th>
                                <th scope="col">지원기관</th>
                                <th scope="col">상세보기</th>
                            </tr>
                        </thead>

                        <!-- SHIMMER CONTENT -->
                        <shimmer-cell :column="5" :row="5" v-if="!isDataLoaded" />
                        <!-- END SHIMMER CONTENT -->

                        <tbody v-else>
                            <tr v-for="user in users" :key="user">
                                <th class="align-middle" scope="row">{{ user.name }}</th>
                                <td class="align-middle">{{ user.phoneNumber }}</td>
                                <td class="align-middle">{{ (user.volunteer) ? user.volunteer.name : "-" }}</td>
                                <td class="align-middle">{{ (user.supportAgent) ? user.supportAgent.name : "-" }}</td>
                                <td class="align-middle">
                                    <div class="d-grid gap-2 d-md-block">
                                        <router-link :to="{name: 'ConnectionDetail', params: {id: user.id}}">
                                            <div class="btn btn-primary mx-2 text-white">
                                                상세보기
                                            </div>
                                        </router-link>
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
    import {
        useRouter
    } from "vue-router";
    import Pagination from "../../components/Pagination.vue"
    import ShimmerCell from "../../components/ShimmerCell.vue"
    import UsersTabLayout from "../../components/UsersTab/UsersTabLayout.vue"

    export default {
        components: {
            'user-tab-layout': UsersTabLayout,
            'shimmer-cell': ShimmerCell,
            'pagination': Pagination,
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
            users() {
                return this.$store.getters['users/users'];
            },
            isDataLoaded() {
                return this.$store.getters['users/isDataLoaded'];
            },
            totalValue() {
                return this.$store.getters['users/totalValue'];
            },
        },

        methods: {
            getAllUser() {
                this.$store.dispatch('users/getAllUser', {
                    'role': this.sortBy,
                    'limit': this.limit,
                    'page': this.currentPage,
                    'search': this.searchQuery,
                    'sort_by':this.sortBy
                })
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
                        break;
                }
                return '';
            },

            movePage(page) {
                this.currentPage = page;
                this.getAllUser();
            },

            sortByRole(role){
                this.sortBy = role;
                this.getAllUser();
            },

            onSearch() {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                
                this.timer = setTimeout(() => {
                    this.getAllUser()
                }, 500);
            }
        },

        created() {
            this.getAllUser();
        },

        setup(props, context) {
            const router = useRouter();

            const connectionDetail = () => {
                router.push("/connectiondetail");
            };

            return {
                connectionDetail,
            };
        },

        beforeUnmount() {
            this.$store.dispatch('users/reset');
        }
    };
</script>