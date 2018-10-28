<template>
    <div>
            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div v-else>
                <div class="ui celled list ui secondary segment" style="text-align: right">
                        
                            <div class="header">{{ content.title }}</div>
                            
                                    {{ content.content }}


                </div>


            </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                content: [

                ],
                loading: false
            };
        },
        methods: {
            getContent(){
                this.loading = true;
                var vinst = this;
                var contentUrl = this.$store.state.hostUrl + '/api/content/' + this.$route.params.content_id;
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