<template>
<div class="ui container" style="text-align: center; margin-bottom: 20px;">
    <div class="top_container ">
        <div class="col-sm-10" style="display:block; margin: auto;">
                    
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                
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
                loading: false
            };
        },
        mixins: [protectedUrlMixin],
        mounted(){
            this.loading = true;
            var vinst = this;
            if (this.$route.query.token) {
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
            }
        }
    }
</script>

<style>
</style>