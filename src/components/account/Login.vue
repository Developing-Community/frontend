<template>
    <div class="ui form" style="direction:rtl;">

        <h3><a class="link" style="margin: 10px;" @click="$router.push({name: 'register', query: $route.query})">ثبت نام -></a></h3>
        <h1 style="text-align: center; margin:30px;">ورود</h1>
        <div v-if="loading" style="width: 100%; text-align: center;">
            <img style="margin: auto;" src="/static/loading.gif" />
        </div>
        <div class="" v-else>
            <div class="field" >
                <div class="">
                    <input class="form-control" type="text" v-model="user.username" placeholder="نام کاربری">
                </div>
            </div>
            <div class="field">
                <div class="">
                    <input class="form-control" @keyup.enter="submit" type="password" v-model="user.password" placeholder="کلمه عبور">
                </div>
            </div>

            <h4><a class="link" style="margin: 10px;" @click="$router.push({name: 'reset-password', query: $route.query})">کلمه عبورتان را فراموش کردید؟</a></h4>
            <button class="ui inverted primary button" style="margin: 10px;" @click="submit">ورود</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      var vinst = this;
      axios
        .post(this.$store.state.endpoints.obtainJWT, {
          username: this.user.username,
          password: this.user.password
        })
        .then(response => {
          alert("با موفقیت وارد شدید");
          this.$store.commit("updateToken", response.data.token);
          if (this.$route.query.next) {
            this.$router.push(this.$route.query.next);
          } else {
            this.$router.push({ name: "home" });
          }
          vinst.loading = false;
        })
        .catch(error => {
          if (error.response) {
            alert("نام کاربری یا رمز عبور اشتباه است");
          } else {
            alert("خطا در ارتباط با سرور");
          }
          console.log(error);
          this.$store.commit("removeToken");
          vinst.loading = false;
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    const token = localStorage.getItem("t");
    if (token && Date.now() / 1000 - jwt_decode(token).orig_iat < 604800) {
      next({ name: "home" });
    }
    next();
  }
};
</script>

<style scoped>
.link:hover {
  cursor: pointer
}
input {
  max-width: 500px;
  margin: auto;
}
</style>
