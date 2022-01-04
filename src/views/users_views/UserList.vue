<template>
    <user-tab-layout :activeItem="'user-list'">
        <div id="user-list">
            <div class="card my-4">
                <div class="card-body">
                    <div class="row my-2 mb-4">
                        <div class="col-4">
                            <form class="d-flex">
                                <input class="form-control rounded-pill me-2" type="search" placeholder="검색" aria-label="Search" v-model="searchQuery" @input="onSearch" />
                            </form>
                        </div>
                        <div class="col-8 ms-auto">
                            <div class="dropdown d-flex justify-content-end">
                                <button class="btn btn-secondary dropdown-toggle py-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>{{ showSortByText(role) }}</span>
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#" @click="selectRole('USER')">{{ $strings.USER() }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click="selectRole('VOLUNTEER')">{{ $strings.VOLUNTEER() }}</a></li>
                                    <li><a class="dropdown-item" href="#" @click="selectRole('SUPPORT_AGENT')">{{ $strings.SUPPORT_AGENCY() }}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <table class="table gray">
                        <thead>
                            <tr class="bold">
                                <th scope="col">아이디</th>
                                <th scope="col">성명</th>
                                <th scope="col">연락처</th>
                                <th scope="col">생년월일</th>
                                <th scope="col">나이</th>
                                <th scope="col">상세보기</th>
                            </tr>
                        </thead>

                        <!-- SHIMMER CONTENT -->
                        <shimmer-cell :column="6" :row="5" v-if="!isDataLoaded" />
                        <!-- END SHIMMER CONTENT -->

                        <!-- USER CONTENT -->
                        <tbody v-else>
                            <tr v-for="user in users" :key="user">
                                <th class="align-middle" scope="row">{{ user.email }}</th>
                                <td class="align-middle">{{ user.name }}</td>
                                <td class="align-middle">{{ user.phoneNumber }}</td>
                                <td class="align-middle">{{ user.birthdate }}</td>
                                <td class="align-middle">{{ age(user.birthdate) }}</td>
                                <td class="align-middle">
                                    <div class="d-grid gap-2 d-md-block">
                                        <router-link :to="{name: 'UserInfo', params: {id: user.id}}">
                                            <div class="btn btn-primary mx-2 text-white">
                                                상세보기
                                            </div>
                                        </router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <!-- END USER CONTENT -->
                    </table>
                </div>
            </div>
            <pagination :currentPage="currentPage" :totalPage="Math.ceil(totalValue/limit)" :callback="movePage" />
        </div>
    </user-tab-layout>
</template>

<script>
    import ShimmerCell from "../../components/ShimmerCell.vue"
    import Pagination from "../../components/Pagination.vue"
    import UsersTabLayout from "../../components/UsersTab/UsersTabLayout.vue"

    export default {
        components: {
            'shimmer-cell': ShimmerCell,
            'user-tab-layout': UsersTabLayout,
            'pagination': Pagination
        },

        data() {
            return {
                role: 'USER',
                limit: 10,
                currentPage: 1,
                searchQuery: ""
            }
        },

        computed: {
            users: function () {
                return this.$store.getters['users/users'];
            },

            totalValue: function () {
                return this.$store.getters['users/totalValue'];
            },

            isDataLoaded: function () {
                return this.$store.getters['users/isDataLoaded'];
            },

            age() {
                return birthdate => {
                    const today = new Date();
                    const bdate = new Date(birthdate)

                    let age = today.getFullYear() - bdate.getFullYear();
                    const month = today.getMonth() - bdate.getMonth();

                    //* Same year but today month before the birthday month || Same month but before date
                    if (month < 0 || (month === 0 && today.getDate() < bdate.getDate())) {
                        age = age - 1;
                    }
                    return age;
                }
            }
        },

        created() {
            this.getAllUser();
        },

        methods: {
            getAllUser() {
                this.$store.dispatch('users/getAllUser', {
                    'role': this.role,
                    'limit': this.limit,
                    'page': this.currentPage,
                    'search': this.searchQuery,
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

            selectRole(role) {
                this.role = role;
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

        setup(props, context) {
            const volunteerDetail = () => {
                router.push("/volunteerdetail");
            };

            const supportAgentDetail = () => {
                router.push("/supportagentdetail");
            };

            return {
                volunteerDetail,
                supportAgentDetail,
            };
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

    .btn-secondary {
        background-color: none;
        border-color: none;
    }
</style>