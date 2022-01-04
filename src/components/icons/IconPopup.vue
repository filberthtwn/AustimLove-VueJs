<template>
    
    <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
     <g :fill="color" >
        <path d="M6.75 20H20.25V0H6.75V20ZM0 17.3333H5.4V2.66667H0V17.3333ZM21.6 2.66667V17.3333H27V2.66667H21.6Z"/>
     </g>
    </svg>
    
</template>

<script>
export default {
    props: {
        color: {
            type:String,
            default: '#023366'
        }
    }
}
</script>