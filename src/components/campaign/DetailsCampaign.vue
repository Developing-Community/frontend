<template>
<div class="ui container" style="text-align: center; margin-bottom: 20px;">
    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
                    
            <div  v-if="loading" style="width: 100%; text-align: center;">
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
                <div  class="ui grid" v-else>
                    <div class="ui stackable two column grid">  
                         <div class="eight wide column">    
                           <div style="text-align:center;width:80em;">
                                <img class="ui medium rounded image" src="/images/wireframe/square-image.png" >
                            </div>
                            
                        </div>
                        <div class="six wide column" style="text-align:center;">

                            <h1>{{ campaign.title }} </h1>
                            <p>{{ campaign.description }}</p>
                            <p>شروع: {{ campaign.start_time }}</p>
                            <p>پایان: {{ campaign.end_time }}</p>

                            <div v-if="isAuthenticated && !campaign.accessable">
                                <button v-if="campaign.enrolled" @click="()=>{}">
                                    لغو درخواست عضویت
                                </button>
                                <button v-else @click="requestEnrollment">
                                    درخواست عضویت
                                </button>
                            </div>

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
                    axios.get(this.$store.state.hostUrl + '/api/campaigns/' + this.$route.params.id + "/",
                    { headers: {
                    'Authorization' : 'JWT ' + localStorage.getItem('t')
                    }
                    }).then(response => {
                        console.log(response.data);
                        vinst.campaign = response.data;
                        vinst.loading = false;
                    }).catch(err => {
                        if(err.response.status == 404){
                            this.$router.push({ name: 'listcampaign' });
                        }
                        vinst.loading = false;
                    })
                } else {
                    this.loading = true;
                    var vinst = this;
                    axios.get(this.$store.state.hostUrl + '/api/campaigns/' + this.$route.params.id + "/",
                    ).then(response => {
                        console.log(response.data);
                        vinst.campaign = response.data;
                        vinst.loading = false;
                    }).catch(err => {
                        if(err.response.status == 404){
                            this.$router.push({ name: 'listcampaign' });
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
                    if(response.statusText == "OK"){
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
                axios.post(this.$store.state.hostUrl + '/api/campaigns/' + this.campaign.id  +'/enroll/', 
                { headers: {
                'Content-type': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                    console.log("good");
                    console.log(response.data);
                    if(response.statusText == "Created"){
                        this.campaign.enrolled = true;
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
        created(){
            this.getCampaign();
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
</style>