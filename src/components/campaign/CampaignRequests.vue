<template>
    <div class="ui container" style="min-height: 150px;">
            <div v-if="loading" class="ui active inverted dimmer">
                <div class="ui large text loader">Loading</div>
            </div>
            <div v-else>
                <div class="ui list">
                    <div class="item" v-for="content in contents">
                            <template v-if="content.content" class = "ui secondary segment right aligned">
                            <div class="header">{{ content.title }}</div>
                                    {{ content.content }}
                            </template>

                            <div v-else class = "ui secondary segment right aligned">
                                    {{ content.title }}
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
                requests: [

                ],
                loading: false
            };
        },
        watch:{
            $route (to, from){
                this.getContents();
            },
        },
        methods: {
            getContents(){
                this.loading = true;
                var vinst = this;
                var contentUrl;
                contentUrl = this.$store.state.hostUrl + '/api/campaigns/' + this.$route.params.campaign_id;
                axios.get(contentUrl).then(response => {
                    console.log(response.data);
                    vinst.contents = response.data.results;
                    vinst.contents.forEach(function(entry) {              
                        if(entry.image == null){
                            entry.image = "/static/white-image.png";
                        }
                    });
                    vinst.loading = false;
                }).catch(err => {
                    vinst.loading = false;
                })
            },
        },
        created(){
            this.getContents();
        }
    }
</script>

<style scoped>
.panel-body {
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    font-family: 'tahoma', cursive;
    font-size: 16px;
    color: #6e6e6e;
}
</style>