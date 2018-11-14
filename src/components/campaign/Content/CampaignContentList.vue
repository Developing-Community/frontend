<template>
    <div class="ui container" style="min-height: 150px;">
            <div v-if="loading" class="ui active inverted dimmer">
                <div class="ui large text loader">Loading</div>
            </div>
            <div v-else>
                <div class="ui list right aligned" dir="rtl">
                    <div class="item right aligned" v-for="content in contents">

                        <template v-if="content.content">
                            <div class="content">
                                <div class="ui segment right aligned">
                                    <div class="ui tiny image circular">
                                        <img :src="content.author.thumbnail" />
                                    </div>
                                    <div class="header">{{ content.title }}</div>
                                    <!-- <div class="meta">
                                        <span class="price">$1200</span>
                                        <span class="stay">1 Month</span>
                                    </div> -->
                                    <div class="description">
                                        <p>{{ content.author.name }}</p>
                                    </div>
                                </div>
                                <div class = "ui container primary segment right aligned" style="padding:10px 30px" v-if="content.content">
                            
                                
                                    <div class = "header" style="padding:7px 10px">{{ content.title }}</div>
                                    {{ content.content }}
                                    <template v-if='content.type == "QUESTION"'>
                                        <div class="ui segment" style="margin-right:30px">
                                            <div style="margin-right:30px">
                                                iojawefoija
                                            </div>
                                            <div style="margin-right:30px">
                                                iojawefoija
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
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