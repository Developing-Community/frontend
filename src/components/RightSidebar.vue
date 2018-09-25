<template>
    <div class="ui right sidebar inverted vertical menu" id="right-menu">
        <a class="item">
            1
        </a>
        <a class="item">
            2
        </a>
        <a class="item">
            3
        </a>
    </div>
</template>

<script>
    export default {
        computed:{
            isAuthenticated(){
                return this.$store.getters.isAuthenticated;
            }
        },
        created(){
            $(document).ready(function() {
                $("#right-menu")
                    .first()
                    .sidebar("setting", { transition: "push" })
                    .sidebar("attach events", ".mobile-button");
            });
        }
    }
</script>

<style scoped>

.contentnav{
    position: relative;
    z-index: 100;
}

.backgroundnav{
    margin: auto;
    position: absolute;
    z-index: -100;
}
</style>