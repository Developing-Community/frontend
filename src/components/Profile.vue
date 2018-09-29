<template>
    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <h1 style="text-align: center; margin:30px;">لطفا صبر کنید...</h1>
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <img :src="profile.profile_image" style="height: 300px; width: 300px;" />
                <h1 style="text-align: center; margin:30px;">{{ profile.first_name }} {{ profile.last_name }}</h1>
                <button class="btn btn-primary" @click="edit = !edit">ویرایش</button>
                <div v-if="edit">
                    <div class="form-group">
                        <label>نام</label>
                        <input class="form-control" type="text" v-model="profile.first_name">
                    </div>
                    <div class="form-group">
                        <label>نام خانوادگی</label>
                        <input class="form-control" type="text" v-model="profile.last_name">
                    </div>
                    <div class="form-group">
                        <label>بیوگرافی</label>
                        <textarea
                            rows="5"
                            class="form-control"
                            v-model="profile.bio"></textarea>
                    </div>
                    <input type="file" id="file" ref="profile_image" v-on:change="handleFileUpload()"/>
                    <button class="btn btn-primary" @click="submit">ثبت تغییرات</button>
                </div>
                <div v-else>
                    <p>{{ profile.bio }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { protectedUrlMixin } from "../protectedUrlMixin";

export default {
  data() {
    return {
      profile: {
        id: 0,
        first_name: "",
        last_name: "",
        bio: "",
        profile_image: ""
      },
      edit: false,
      loading: false
    };
  },
  mixins: [protectedUrlMixin],
  methods: {
    handleFileUpload(){
        this.loading = true;
        var vinst = this;
        let formData = new FormData();
        formData.append('profile_image', this.$refs.profile_image.files[0]);
        formData.append('x', 'x');
        console.log(formData);
        axios.put( this.$store.state.hostUrl + '/api/user/profile/' + this.profile.id + '/profile-image/',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
              Authorization: "JWT " + localStorage.getItem("t")
            }
        }
        ).then(response => {
          console.log(response.data);
          vinst.profile = response.data;
          vinst.loading = false;
        })
        .catch(function(){
          vinst.loading = false;
        });
    },
    getProfile() {
      this.loading = true;
      var vinst = this;
      axios
        .get(this.$store.state.hostUrl + "/api/user/profile/", {
          headers: {
            Authorization: "JWT " + localStorage.getItem("t")
          }
        })
        .then(response => {
          console.log(response.data);
          vinst.profile = response.data;
          if(vinst.profile.profile_image){
            vinst.profile.profile_image = $store.state.hostUrl + vinst.profile.profile_image;
          } else {
            vinst.profile.profile_image = "/static/white-image.png";
          }
          vinst.loading = false;
        })
        .catch(err => {
          vinst.loading = false;
        });
    },
    submit() {
      this.loading = true;
      var vinst = this;
      axios
        .put(
          this.$store.state.hostUrl +
            "/api/user/profile/" +
            this.profile.id +
            "/update/",
          this.profile, // the data to post
          {
            headers: {
              "Content-type": "application/json",
              Authorization: "JWT " + localStorage.getItem("t")
            }
          }
        )
        .then(response => {
          console.log("good");
          console.log(response);
          console.log(response.data);
          console.log(response.statusText);
          if (response.statusText == "OK") {
            alert("تغییرات با موفقیت ثبت شد");
          }
          vinst.loading = false;
        })
        .catch(err => {
          console.log("bad");
          console.log(err.response);
          vinst.loading = false;
        });
    }
  },
  created() {
    this.getProfile();
  }
};
</script>

<style scoped>
h1,
h4,
label,
button {
  font-family: tahoma;
}
.panel-body {
  font-family: "tahoma", cursive;
  font-size: 16px;
  color: #6e6e6e;
}
</style>