<template>

    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
        <transition name="slide">
            <router-view></router-view>
        </transition>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>

    .slide-enter-active {
        animation: slide-in .3s ease-out forwards;
    }

    @keyframes slide-in {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }


</style>