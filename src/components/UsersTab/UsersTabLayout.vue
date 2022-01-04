<template>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('regis') }" :to="{name: 'RegisRequests'}">
                <span>신규 회원</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('user-list') }" :to="{name: 'UserList'}">
                <span>회원 관리</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('conn') }" :to="{name: 'Connections'}">
                <span>회원 연결 관리</span>
            </router-link>
        </li>
    </ul>
    <transition name="route" appear>
        <slot/>
    </transition>
</template>

<script>
export default {
    props: {
        activeItem: {
            type: String,
            default: 'regis'
        },
    },

    computed: {
        isDataLoaded: function () {
            console.log(this.$store.getters['users/isDataLoaded']);
            return this.$store.getters['users/isDataLoaded'];
        },
        isActive() {
            return val => {
                return this.activeItem === val;
            }
        },
    },

    methods: {
        setActive(val) {
            this.activeItem = val;
        },
    },
};
</script>