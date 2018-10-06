<template>
    <div class="ui form" style="direction:rtl;">
            <h3><a class="link" style="margin: 10px;" @click="$router.push({name: 'login', query: $route.query})"><- ورود</a></h3>
            <h1 style="text-align: center; margin:30px;">فراموشی کلمه عبور</h1>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <template v-if="$route.query.token">
                  <div class="field ">
                      <div class="">
                          <label>کلمه عبور جدید</label>
                          <input class="form-control" @keyup.enter="submitConfirm" type="text" v-model="rpdata.password">
                      </div>
                  </div>
                  <button class="ui inverted primary button" @click="submitConfirm">تایید</button>
                </template>
                <template v-else>
                  <div class="field ">
                      <div class="">
                          <label>ایمیل</label>
                          <input class="form-control" @keyup.enter="submitRequest" type="text" v-model="user.email">
                      </div>
                  </div>
                  <button class="ui inverted primary button" @click="submitRequest">تایید</button>
                </template>
            </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        email: "",
      },
      rpdata: {
        password: "",
        token: ""
      },
      loading: false
    };
  },
  methods: {
    submitRequest() {
      this.loading = true;
      var vinst = this;
      axios
        .post(
          this.$store.state.hostUrl + "/api/reset-password/",
          this.user, // the data to post
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("good");
          console.log(response.status);
          if (response.status == 200) {
            alert("لطفا ایمیلتان را چک کنید. (ممکن است در پوشه اسپم باشد)");
          }
          vinst.loading = false;
        })
        .catch(err => {
          if(err.response){
              console.log(err)
              if (err.response.data.email) {
                alert("Email: " + err.response.data.email[0]);
              } else {
                alert("خطا. لطفا آدرس ایمیل را چک کنید")
              }
          } else {
              alert('خطا در ارتباط با سرور')
          }
          vinst.loading = false;
        });
    },
    submitConfirm(){
      this.loading = true;
      var vinst=this;
      this.rpdata.token = this.$route.query.token
      axios
        .post(
          this.$store.state.hostUrl + "/api/reset-password/confirm/",
          this.rpdata, // the data to post
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("good");
          if (response.status == 200) {
            alert("کلمه عبور با موفقیت تغییر یافت");
          }
          vinst.loading = false;
          this.$router.push({ name: "login" });
        })
        .catch(err => {
          if(err.response){
              console.log(err)
              if (err.response.data.token) {
                alert("Token: " + err.response.data.token[0]);
              } else if (err.response.data.then) {
                alert("Password: " + err.response.data.password[0]);
              } else if (err.response.data.status){
                alert("کد نامعتبر");
              } else {
                alert("خطا. لطفا دقایقی دیگر مجددا سعی کنید")
              }
          } else {
              alert('خطا در ارتباط با سرور')
          }
          vinst.loading = false;
        });
    },
    created(){
      this.rpdata.token = this.$route.query.token
    }
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