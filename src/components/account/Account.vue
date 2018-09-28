<template>

<div id="container" class="ui container" style="text-align: center; margin-bottom: 20px;">
    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
        <transition name="slide">
        <router-view></router-view>
        </transition>
    </div>
    </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
    .slide-enter {
        opacity: 0;
    }

    .slide-enter-active {
        animation: slide-in .5s ease-out forwards;
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