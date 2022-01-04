<template>
    <div class="container">
        <div class="row my-2 align-items-start">
            <div class="col d-flex text-start align-middle">
                <router-link :to="{name: 'Users'}">
                    <div @click="backToUserList" class="btn btn-primary d-flex mx-2 p-0" style="height: 32px; width:32px">
                        <svg class="vue-icon m-auto" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="white" />
                        </svg>
                    </div>
                </router-link>

                <p class="d-inline text-center my-auto bold">회원관리</p>
            </div>
            <div class="col h-100 text-center align-middle">
                <p class="d-inline bold">회원 정보</p>
            </div>
            <div class="col text-end d-flex">
                <div class="d-flex ms-auto" v-if="!isDataLoaded">
                    <clip-loader class="ms-auto me-2" color='#023366'/>
                    <p class="my-auto">Loading...</p>
                </div>
            </div>
        </div>
        <div class="row">
           <div class="col-12">
                <custom-alert :message="successMsg" :isSuccess="(successMsg != null)" v-if="successMsg"/>
           </div>
        </div>
        <div class="row my-4">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <router-link class="nav-link" @click.prevent="setActive('userinfo')" :class="{ active: isActive('userinfo') }" :to="{name: 'UserInfo'}">
                        <span>회원 정보</span>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" @click.prevent="setActive('balancehistory')" :class="{ active: isActive('balancehistory') }" :to="{name: 'BalanceHistory'}">
                        <span>계좌 정보</span>
                    </router-link>
                </li>
            </ul>
            <transition name="route" appear>
                <slot name="content" :isDisabled="disabled"/>
            </transition>
        </div>
    </div>
</template>

<script>
    import ClipLoader from "vue-spinner/src/ClipLoader.vue"
    import Pagination from "../components/Pagination.vue"
    export default {
        components:{
            'pagination': Pagination,
            ClipLoader
        },
        computed:{
            successMsg() {
                return this.$store.getters['users/successMsg'];
            }
        },

        props: {
            activeItem: {
                default: 'userinfo'
            },
            isDataLoaded: false
        },
        methods: {
            isActive(val) {
                return this.activeItem === val
            },

            setActive(val) {
                return this.activeItem === val
            },

            toggleEditMode(){
                this.disabled = !this.disabled
            },
        },
        created() {
            this.$store.dispatch('users/reset')
        },
    }
</script>
