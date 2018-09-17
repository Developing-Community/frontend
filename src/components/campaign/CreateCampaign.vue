<template>
<div>
            <h1 style="text-align: center; margin:30px;">ثبت نام</h1>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <div class="form-group">
                    <label>عنوان</label>
                    <input class="form-control" type="text" v-model="campaign.title">
                </div>  
                <div class="form-group">
                    <label>توضیحات</label>
                        <textarea
                            rows="5"
                            class="form-control"
                            v-model="campaign.description"></textarea>
                </div>
                <button class="btn btn-primary" @click="submit">تایید</button>
            </div>
            </div>
</template>

<script>
    //TODO: register should accept 'next' from url parameters
    import axios from 'axios';

    export default {
        data() {
            return {
                campaign: {
                    title: '',
                    description: '',
                },
                loading: false
            };
        },
        methods: {
            submit() {
                this.loading = true;
                var vinst = this;
                axios.post(this.$store.state.hostUrl + '/api/campaigns/create/', 
                this.campaign, // the data to post
                { headers: {
                'Content-type': 'application/json',
                'Authorization' : 'JWT ' + localStorage.getItem('t')
                }
                }).then(response => {
                            console.log("good");
                            console.log(response.data);
                            if(response.statusText == "Created"){
                                alert("با موفقیت ثبت شد");
                            }
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
input {
    max-width: 500px;
    margin: auto;
}
</style>