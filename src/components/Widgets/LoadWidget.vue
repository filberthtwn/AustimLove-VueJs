<template>
    <clip-loader class="mx-auto" :loading="true" :color="color" :size="size"></clip-loader>
</template>

<script>
    import ClipLoader from "vue-spinner/src/ClipLoader.vue";
    export default {
        components: {
            ClipLoader
        },
        props: {
            size: {
                default: '40px'
            },
            color: {
                default: '#023366'
            },
        },
    }
</script>