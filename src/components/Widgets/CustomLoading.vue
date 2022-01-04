<template>
    <div class="custom-loading" v-show="isShow">
        <div class="position-absolute top-0 bottom-0 start-0 end-0" style="z-index: 1002">
            <div class="position-relative w-100 h-100">
                <div class="position-absolute top-0 bottom-0 start-0 end-0" style="background:black; z-index: 1001; opacity: 0.5"></div>
                <div class="position-absolute top-50 start-50 translate-middle d-flex" style="background:white; z-index: 1002; width: 150px;height:150px; border-radius: 10px;">
                    <load-widget class="m-auto" :size="'75px'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        isShow: false
    }
}
</script>