<template>
    <div class="ui form" style="direction:rtl;">
            <h3><a class="link" style="margin: 10px;" @click="$router.push({name: 'login', query: $route.query})"><- ورود</a></h3>
            <h1 style="text-align: center; margin:30px;">ثبت نام</h1>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <div class="field">
                    <div class="">
                        <label>نام کاربری</label>
                        <input class="form-control" type="text" v-model="user.username">
                    </div>
                </div>  
                <div class="field ">
                    <div class="">
                        <label>ایمیل</label>
                        <input class="form-control" type="text" v-model="user.email">
                    </div>
                </div>
                <div class="field ">
                    <div class="">
                        <label>کلمه عبور</label>
                        <input class="form-control" @keyup.enter="submit" type="password" v-model="user.password">
                    </div>
                </div>
                <!-- <div class="form-group">
                    <label>نام</label>
                    <input class="form-control" type="text" v-model="user.first_name">
                </div>
                <div class="form-group">
                    <label>نام خانوادگی</label>
                    <input class="form-control" @keyup.enter="submit" type="text" v-model="user.last_name">
                </div> -->
                <button class="ui inverted primary button" @click="submit">ثبت نام</button>
            </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
        // first_name: '',
        // last_name: ''
      },
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      var vinst = this;
      axios
        .post(
          this.$store.state.hostUrl + "/api/user/register/",
          this.user, // the data to post
          {
            headers: {
              "Content-type": "application/json"
            }
          }
        )
        .then(response => {
          console.log("good");
          console.log(response.data);
          if (response.status == 201) {
            alert("ثبت نام با موفقیت انجام شد");
          }

          axios
            .post(this.$store.state.endpoints.obtainJWT, {
              username: this.user.username,
              password: this.user.password
            })
            .then(response => {
              vinst.$store.commit("updateToken", response.data.token);
              if (vinst.$route.query.next) {
                vinst.$router.push(this.$route.query.next);
              } else {
                vinst.$router.push({ name: "home" });
              }
              vinst.loading = false;
            })
        })
        .catch(err => {
          if(err.response){
              console.log(err)
              if (err.response.data.username) {
                alert("Username: " + err.response.data.username[0]);
              }
              if (err.response.data.password) {
                alert("Password: " + err.response.data.password[0]);
              }
              if (err.response.data.email) {
                alert("Email: " + err.response.data.email[0]);
              }
          } else {
              alert('خطا در ارتباط با سرور')
          }
          vinst.loading = false;
        });
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