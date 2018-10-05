<template>
    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <h1 style="text-align: center; margin:30px;">لطفا صبر کنید...</h1>
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div class="ui container segment" v-else>

              <div class="ui grid" style="margin-bottom:30px;">
                <div class="six wide column" >
                  <img class="ui small circular image segment" src="/static/image.png"  />
                </div>

                <div class="eight wide column">
                  


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
                      <button class="ui primary button" @click="edit = !edit">ویرایش</button>
                      
                  </div>
                  
  
                  <div class="" v-else style="text-align:right;">
                    <div style="padding-right:8px; padding-top:30px;">
                      <h4>علی مهدی یار</h4>
                      <p style="padding-bottom:8.5px; ">برنامه نویس</p>
                      <p style="padding-bottom:5px;">شمنسیتکشمسنیکنکم نشکمسین 
                        شکمسینشکمسنی شنسی 
                        نشس یکمنشسکیم نشگسی نمشسگکین
                      </p>
                    </div>
                    <button class="ui small primary button" @click="edit = !edit">ویرایش</button>
                  </div>

                </div>

              </div>



                <hr />




                <div style="margin-bottom:20px; ">
                  <p>مهارت ها</p>

                  <select class="ui search dropdown">
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                  </select>

                  <button class="ui small primary button">ثبت</button>


                  <div class="" style="margin-top:10px; padding-left:10px; ">
                    <div class="ui blue label" style="">
                      
                      فارسی
                      <i class="delete icon"></i>
                    </div>
                       <div class="ui blue label">
                      
                      Html CSs
                      <i class="delete icon"></i>
                    </div>
                    <div class="ui blue label">
                      
                      Semantic
                      <i class="delete icon"></i>
                    </div>
                  
                    <div class="ui blue label">
                      
                      Django
                      <i class="delete icon"></i>
                    </div>
                  </div> 


                </div>



                <hr />
                <div>
                  <p>اطلاعات تماس</p>
                  <div class="" style="direction: rtl; margin-bottom:2px; margin-top: 10px; ">

                    <div class="ui label" style="" >

                      موبایل
                      09XXXXXXX
                    
                      <i class="delete icon"></i>
                    </div>
                   
                  </div>


                  <select class="ui search dropdown">
                    <option value="">State</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                  </select>

                  <button class="ui small primary button">ثبت</button>
                      
                      



                    </div>

                  </div>
                  


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
          if (response.status == 200) {
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
  },
  updated(){
    $(".dropdown").dropdown();
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