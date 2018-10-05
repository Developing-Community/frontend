<template>
    <div class="ui form" style="direction:rtl;">
            <h3><a class="link" style="margin: 10px;" @click="$router.push({name: 'login', query: $route.query})"><- ورود</a></h3>
            <h1 style="text-align: center; margin:30px;">فراموشی کلمه عبور</h1>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <div class="field ">
                    <div class="">
                        <label>ایمیل</label>
                        <input class="form-control" @keyup.enter="submit" type="text" v-model="user.email">
                    </div>
                </div>
                <button class="ui inverted primary button" @click="submit">تایید</button>
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
      loading: false
    };
  },
  methods: {
    submit() {
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