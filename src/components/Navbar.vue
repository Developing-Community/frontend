<template>
    <div id="nav" class="ui large inverted pointing menu fixed secondary"style="border-bottom: 0px;">

            <div class="backgroundnav" style="width: 100%; text-align: center;">
                    <img src="/static/img/Logo.png" style="width: 70px; margin-top:13px; opacity: 0.65" />
            </div>
    <!-- <div class="contentnav">     -->


        <div class="ui container contentnav">
                <a class="item" style="height: 100%">خانه</a>
            <div class="right item ">
                <a class="item mobile-button"> <i class="content icon"></i> </a>
                <a class="item" href="/">خانه</a>
                <a class="item" href="/account/register/">ثبت نام</a>
            </div>
        <!-- </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            isAuthenticated(){
                return this.$store.getters.isAuthenticated;
            }
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