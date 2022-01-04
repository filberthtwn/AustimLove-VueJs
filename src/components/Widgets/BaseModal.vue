<template>
    <div class="base-modal" v-show="isShow">
        <div class="position-absolute top-0 bottom-0 start-0 end-0" style="z-index: 1000">
            <div class="position-relative w-100 h-100">
                <div class="position-absolute top-0 bottom-0 start-0 end-0" style="background:black; z-index: 1001; opacity: 0.5" @click="toggleModal()"></div>
                    <div class="position-absolute top-50 start-50 translate-middle py-5" style="background:white; z-index: 1002; width: 500px; border-radius: 10px;">
                        <slot :toggleModal="toggleModal"></slot>
                    </div>
            </div>
        </div>
    </div>
</template>

<style>
    .base-modal{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
</style>

<script>
export default {
    data() {
        return {
            isShowModal: this.isShow,
        }
    },
    props:{
        isShow: {
            type: Boolean,
            default: false,
        }
    },
    watch:{
        isShow: function (newVal, oldVal){
            this.isShowModal = newVal;
        }
    },
    methods: {
        toggleModal(){
            this.isShowModal = false;
        }
    },
}
</script>