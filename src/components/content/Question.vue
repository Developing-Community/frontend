<template>
    <div>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <template v-else>

                <div class="ui segment right aligned">
                    <div class="ui tiny image circular">
                        <img :src="content.author.thumbnail" />
                    </div>
                    <div class="header">{{ content.title }}</div>
                    <div class="description">
                        <p>{{ content.author.name }}</p>
                    </div>
                </div>
                <div class = "ui container primary segment right aligned" style="padding:10px 30px" v-if="content.content">
            
                
                    <div class = "header" style="padding:7px 10px">{{ content.title }}</div>
                    {{ content.content }}
                    <template v-if='content.type == "QUESTION"'>
                        <div class="ui segment" style="margin-right:30px">
                            <div v-for="answer in content.answers" class="ui segment" style="margin-right:30px">
                                {{answer.content}}
                            </div>
                        </div>
                    </template>
                </div>


            </template>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                content: {
                },
                loading: false
            };
        },
        methods: {
            getContent(){
                this.loading = true;
                var vinst = this;
                var contentUrl = this.$store.state.hostUrl + '/api/content/get-by-slug/QUESTION/' + this.$route.params.q_slug;
                axios.get(contentUrl).then(response => {
                    console.log(response.data);
                    vinst.content = response.data;
           
                    if(vinst.content.image == null){
                        vinst.content.image = "/static/white-image.png";
                    }
                    vinst.loading = false;
                }).catch(err => {
                    vinst.loading = false;
                })
            },
        },
        created(){
            this.getContent();
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