<template>
    <div class="ui form" >
        <h1 style="text-align: center; margin:30px;">ثبت دوره جدید</h1>
        <div  v-if="loading" style="width: 100%; text-align: center;">
            <img style="margin: auto;" src="/static/loading.gif" />
        </div>
        <div v-else>
            <div class="field">
                <label>عنوان</label>
                <input type="text" v-model="campaign.title">
            </div>  
            <div class="field">
                <label>توضیحات</label>
                    <textarea rows="4"  v-model="campaign.description"></textarea>
            </div>
            <div class="field">
                <label>شروع</label>
                <input type="text" v-model="campaign.start_time" placeholder="YYYY/MM/DD">
                
            </div>
            <div class="field">
                <label>پایان</label>
                <input type="text" v-model="campaign.end_time" placeholder="YYYY/MM/DD">
                
            </div>
            <button class="ui inverted primary button" @click="submit">تایید</button>
        </div>
    </div>
</template>

<script>
    //TODO: register should accept 'next' from url parameters
    import axios from 'axios';
    import { protectedUrlMixin } from "../../protectedUrlMixin";

    export default {
        data() {
            return {
                campaign: {
                    title: '',
                    description: '',
                    start_time: '',
                    end_time: ''
                },
                loading: false
            };
        },
        mixins: [protectedUrlMixin],
        methods: {
            submit() {
                this.loading = true;
                var vinst = this;
                axios.post(this.$store.state.hostUrl + '/api/campaigns/study/create/', 
                this.campaign, // the data to post
                { headers: {
                'Content-type': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                    console.log("good");
                    console.log(response.data);
                    if(response.status == 201){
                        alert("با موفقیت ثبت شد");
                    }
                    this.$router.push({ name: 'listcampaign' });
                    vinst.loading = false;
                })
                .catch(err => {
                    console.log("bad");
                    console.log(err.response);
                    if(err.response.data.title){
                        alert("Name: " + err.response.data.title[0]);
                    }
                    if(err.response.data.description){
                        alert("Description: " + err.response.data.description[0]);
                    }
                    vinst.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
.ui.form{
    direction: rtl;
}
textarea{
    max-width: 600px;
}
input {
    max-width: 500px;
    margin: auto;
}
</style>