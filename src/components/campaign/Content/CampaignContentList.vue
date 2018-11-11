<template>
    <div>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <div class="ui list">
                    <div class="item" v-for="content in contents">
                            <template v-if="content.content">
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
                contents: [

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
                if(this.$route.name == 'study-questions'){
                    contentUrl += '/questions/'
                } else if (this.$route.name == 'study-partitions'){
                    contentUrl += '/partitions/'
                }
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