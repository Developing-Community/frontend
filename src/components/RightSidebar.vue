<template>
    <div class="ui right sidebar inverted vertical menu" id="right-menu">
        <div class="item">
            <img src="/static/img/Logo.png" id="sidebarlogo"/>
        </div>

        <div class="item">
            <div class="ui icon input desk-only" id="rightsearchbar">
                <i class="search icon"></i>
                <input type="text" placeholder="Search...">
            </div>
        </div>
        <router-link :to="{name: 'home'}" tag="a" class="item"><a>خانه</a></router-link>
        <router-link :to="{name: 'groups'}" tag="a" class="item"><a>لینک گروه ها</a></router-link>

        <div class="item">
            <div class="header"><p>ناحیه کاربری</p></div>
            <div class="menu" v-if="isAuthenticated">
                <router-link :to="{name: 'profile'}" tag="a" class="item">پروفایل</router-link>
                <router-link :to="{name: 'logout'}" tag="a" class="item">خروج</router-link>
            </div>
            <div  class="menu" v-else>
                <router-link :to="{name: 'register'}" tag="a" class="item">ثبت نام</router-link>
                <router-link :to="{name: 'login'}" tag="a" class="item">ورود</router-link>
            </div>
        </div>
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
                $("a.item").click(function(){
                    $("#right-menu")
                        .first()
                        .sidebar("hide", { transition: "push" });
                })
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

.item {
    text-align: right;
}
#sidebarlogo {
    width: 70px;
    margin: 20px auto;
}
</style>