<template>
        <div class="content">
        <div v-if="isAuthenticated">
        <h3>باتشکر از عضویت شما</h3>
        <a href="https://t.me/joinchat/BzST0lBdHY9og6kPus_InQ"><h3>لینک گروه برنامه نویسی</h3></a>
            <a href="https://t.me/joinchat/BzST0kYP9WIgkR4gz5GJdg"><h3>لینک گروه طراحی و گرافیک</h3></a>
            <a href="https://t.me/joinchat/BzST0lBqx8zMoRygUZyxvg"><h3>لینک گروه هنر</h3></a>
            <a href="https://t.me/joinchat/BzST0ksuVjIOB2NUSZTUhg"><h3>لینک گروه علوم انسانی و پایه</h3></a>
        </div>
        <div v-else>
        <p>فقط اعضا قادر به مشاهده لینک گروه ها هستند.</p>
        <h3>
            <router-link :to="{name: 'register'}" tag="a"><a>عضویت</a></router-link>
            <span style="font-size:80%;padding:1px;">-</span>
            <router-link :to="{name: 'login'}" tag="a"><a>ورود</a></router-link>
        </h3>
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

p, h3 {
padding:10px;text-align:center
}
</style>