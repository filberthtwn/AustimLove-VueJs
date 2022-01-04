<template>
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('transactions') }" :to="{name: 'Transactions'}">
                <span>사용내역 업로드</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('push-notif') }" :to="{name: 'PushNotif'}">
                <span>푸시 보내기</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('announcements') }" :to="{name: 'Announcements'}">
                <span>공지사항</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" :class="{ active: isActive('popup-manager') }" :to="{name: 'PopupManager'}">
                <span>팝업 관리</span>
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
            default: 'transactions'
        },
    },

    computed: {
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