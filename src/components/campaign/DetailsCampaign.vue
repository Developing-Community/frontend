<template>
<div>

    <div class="ui inverted vertical masthead center aligned segment" id="header">
        
    </div>

    <div id="container" class="ui container segment" style="text-align: center; margin-bottom: 20px; margin-top: 70px;">
        <div class="top_container ">
            <div class="col-sm-10" style="display:block; margin: auto;">
                        
                <div  v-if="loading" class="ui center aligned" style="width: 100%;">
                    <img style="margin: auto;" src="/static/loading.gif" />
                </div>
                <div v-else>
                    <button v-if="campaign.accessable" class="btn btn-primary" @click="edit = !edit">ویرایش</button>
                    <div v-if="edit">
                        <div class="form-group">
                            <label>نام</label>
                            <input class="form-control" type="text" v-model="campaign.title">
                        </div>
                        <div class="form-group">
                            <label>توضیحات</label>
                            <textarea
                                rows="5"
                                class="form-control"
                                v-model="campaign.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label>شروع</label>
                            <input class="form-control" type="text" v-model="campaign.start_time">
                            <p style="text-align: center;">YYYY-MM-DD</p>
                        </div>
                        <div class="form-group">
                            <label>پایان</label>
                            <input class="form-control" type="text" v-model="campaign.end_time">
                            <p style="text-align: center;">YYYY-MM-DD</p>
                        </div>
                        <button class="btn btn-primary" @click="submit">ثبت تغییرات</button>
                    </div>


                    <div  class="" v-else>

                                <div class="ui center aligned" style="text-align:center;">

                                    <h1>{{ campaign.title }} </h1>
                                    <p style="font-size:120%; margin-top:20px">{{ campaign.creator }}</p>
                                    <p style="font-size:120%">{{ campaign.description }}</p>


                                    <div v-if="isAuthenticated && !campaign.accessable && !campaign.enrolled">
                                        <button class="ui small inverted primary button" v-if="campaign.requested" @click="cancelEnrollmentRequest">
                                            لغو درخواست عضویت
                                        </button>
                                        <button class="ui small primary button" v-else @click="requestEnrollment">
                                            درخواست عضویت
                                        </button>
                                    </div>

                                </div>

                        <div class="ui top attached tabular menu" dir="rtl">
                            <router-link :to="{name: 'study-partitions'}" class="item" active-class="active" exact>بودجه بندی</router-link>
                            <router-link :to="{name: 'study-questions'}" class="item" active-class="active" exact>پرسش و پاسخ</router-link>
                            <router-link :to="{name: 'study-articles'}" class="item" active-class="active" exact>محتوا</router-link>
                            <!-- <a class="item active" data-tab="first">پیام ها</a>
                            <a class="item" data-tab="second">پرسش و پاسخ</a>
                            <a class="item" data-tab="third">وظایف</a> -->

                        </div>

                        <div class="ui bottom attached tab segment active ">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                campaign: {
                    id: 0,
                    title: '',
                    description: '',
                    start_time: '',
                    end_time: '',
                    accessable: false,
                    enrolled: false,
                },
                edit: false,
                loading: false
            };
        },
        computed:{
            isAuthenticated(){
                return this.$store.getters.isAuthenticated;
            }
        },
        methods: {
            getCampaign(){
                if(this.$store.state.isAuthenticated){
                    this.loading = true;
                    var vinst = this;
                    axios.get(this.$store.state.hostUrl + '/api/campaigns/' + this.$route.params.campaign_id + "/",
                    { headers: {
                    'Authorization' : 'JWT ' + localStorage.getItem('t')
                    }
                    }).then(response => {
                        console.log(response.data);
                        vinst.campaign = response.data;

                        if(vinst.campaign.image){
                            vinst.campaign.image = vinst.campaign.image;
                        } else {
                            vinst.campaign.image = "/static/white-image.png";
                        }
                        vinst.loading = false;
                    }).catch(err => {
                        if(err.response.status == 404){
                            this.$router.push({ name: 'list-study' });
                        }
                        vinst.loading = false;
                    })
                } else {
                    this.loading = true;
                    var vinst = this;
                    axios.get(this.$store.state.hostUrl + '/api/campaigns/' + this.$route.params.campaign_id + "/",
                    ).then(response => {
                        console.log(response.data);
                        vinst.campaign = response.data;
                        vinst.loading = false;
                    }).catch(err => {
                        if(err.response.status == 404){
                            this.$router.push({ name: 'list-study' });
                        }
                        vinst.loading = false;
                    })
                }
            },
            submit(){
                this.loading = true;
                var vinst = this;
                axios.put(this.$store.state.hostUrl + '/api/campaigns/' + this.campaign.id + '/edit/', 
                this.campaign, // the data to post
                { headers: {
                'Content-type': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                    console.log("good");
                    console.log(response)
                    console.log(response.data);
                    console.log(response.statusText)
                    if(response.status == 200){
                        alert("تغییرات با موفقیت ثبت شد");
                    }
                    vinst.loading = false;
                })
                .catch(err => {
                    console.log("bad");
                    console.log(err.response);
                    vinst.loading = false;
                });
            },
            requestEnrollment() {
                this.loading = true;
                var vinst = this;
                axios.post(this.$store.state.hostUrl + '/api/campaigns/' + this.campaign.id  +'/request-enrollment/', 
                {},
                { headers: {
                'Content-type': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                    console.log("good");
                    console.log(response.data);
                    if(response.status == 201){
                        vinst.campaign.requested = true;
                    }
                    vinst.loading = false;
                })
                .catch(err => {
                    console.log("bad");
                    console.log(err.response);
                    vinst.loading = false;
                });
            },
            cancelEnrollmentRequest() {
                this.loading = true;
                var vinst = this;
                axios.post(this.$store.state.hostUrl + '/api/campaigns/' + this.campaign.id  +'/cancel-request/', 
                {},
                { headers: {
                'Content-type': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                    console.log("good");
                    console.log(response.data);
                    vinst.campaign.requested = false;
                    vinst.loading = false;
                })
                .catch(err => {
                    console.log("bad");
                    console.log(err.response);
                    vinst.loading = false;
                });
            }
        },
        created(){
            this.getCampaign();
        },
        updated(){
            $('.menu .item').tab();
        }
    }
</script>

<style scoped>
h1, h4, label, button{
    font-family: tahoma;
}
.panel-body {
    font-family: 'tahoma', cursive;
    font-size: 16px;
    color: #6e6e6e;
}

/* copy from home */


h5 {
  text-align: center;
  color: #2900a8;
  padding-top: 10px;
}
.column p {
  margin-top: 30px;
  line-height:35px;
}
.hidden.menu {
  display: none;
}
.masthead.segment{
  background: url('/static/banner.png');
}
.masthead.segment {
  height: 400px;

  background-size: cover;
  padding: 1em 0em;
}


.masthead .logo.item img {
  margin-right: 1em;
}
.masthead .ui.menu .ui.button {
  margin-left: 0.5em;
}
.masthead h1.ui.header {
  margin-top: 3em;
  margin-bottom: 0em;
  font-size: 4em;
  font-family: IRANSans;
  font-weight: normal;
}
.masthead h2 {
  font-size: 1.7em;
  font-weight: normal;
}

.ui.vertical.stripe {
  padding: 8em 0em;
}
.ui.vertical.stripe h3 {
  font-size: 2em;
}
.ui.vertical.stripe .button + h3,
.ui.vertical.stripe p + h3 {
  margin-top: 3em;
}
.ui.vertical.stripe .floated.image {
  clear: both;
}
.ui.vertical.stripe p {
  font-size: 1.33em;
}
.ui.vertical.stripe .horizontal.divider {
  margin: 3em 0em;
}

.quote.stripe.segment {
  padding: 0em;
}
.quote.stripe.segment .grid .column {
  padding-top: 5em;
  padding-bottom: 5em;
}

.footer.segment {
  padding: 5em 0em;
}

.secondary.pointing.menu .toc.item {
  display: none;
}

.masthead h1.ui.header {
  margin-top: 250px;
}

.masthead .button {
  font-family: IRANSans-light;
}

@media only screen and (max-width: 700px) {
  .ui.fixed.menu {
    display: none !important;
  }
  .secondary.pointing.menu .item,
  .secondary.pointing.menu .menu {
    display: none;
  }
  .secondary.pointing.menu .toc.item {
    display: block;
  }
  .masthead h1.ui.header {
    margin-top: 200px;
    font-size: 3em;
  }
  .masthead h2 {
    font-size: 1.5em;
  }
}

</style>