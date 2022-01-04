<template>
    <div class="d-flex px-3" 
    :style="isSuccess ? {'background-color': '#6DCC5F'} : {'background-color': '#FF6767'}"
    style="border-radius:10px;">
        <img class="my-auto" src="@/assets/img/ui/ic_success.svg" v-if="isSuccess">
        <img class="my-auto" src="@/assets/img/ui/ic_warning.svg" v-else>
        <p class="ms-3 py-4 text-white">{{ message }}</p>
    </div>
</template>

<script>
export default {
    props: ['isSuccess', 'message']
}
</script>