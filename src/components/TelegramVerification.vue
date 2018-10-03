<template>
<div class="ui container" style="text-align: center; margin-bottom: 20px;">
    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
            <img style="margin: auto;" src="/static/loading.gif" />
        </div>
    </div>
</div>
</template>

<script>
    import axios from "axios";
    import { protectedUrlMixin } from "../protectedUrlMixin";
    
    export default {
        mixins: [protectedUrlMixin],
        mounted(){
            var vinst = this;
            if (this.$route.query.token) {
                console.log(this.$store.state.hostUrl + '/api/user/auth/verify-telegram-token/');
                axios.post(this.$store.state.hostUrl + '/api/user/auth/verify-telegram-token/', 
                {
                    verify_token: this.$route.query.token
                }, // the data to post
                { headers: {
                    'Content-type': 'application/json',
                    'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                    console.log(response.data);
                    alert('تلگرام شما با موفقیت تایید شد.');
                    this.$router.push({ name: 'home'});
                })
                .catch(err => {
                    console.log(err.response);
                    alert('خطا در تایید کد');
                    this.$router.push({ name: 'home'});
                });
            } else {
                this.$router.push({ name: 'home'});
            }
        }
    }
</script>

<style>
</style>