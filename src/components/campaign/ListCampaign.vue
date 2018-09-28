<template>
    <div>
            <h1 style="margin:30px; text-align: center;">کمپین های مطالعاتی</h1>

            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div style="text-align: center;" v-else>
                <hr/>
                
                <div class="ui stackable three column grid">
                    <div class="column" v-for="campaign in campaigns" style="max-width: 400px; min-width:300px">
                        
                        <div >
                            <div class="panel-body quote">

                                <router-link
                                    tag="h2"
                                    :to="{name: 'detailcampaign', params: { id: campaign.id }}"
                                    style="cursor: pointer">
                                    <img :src="campaign.image" style="height: 200px; width: 200px;" />
                                    {{ campaign.title }}</router-link>
                                <p>{{ campaign.description }}</p>
                                <p>شروع: {{ campaign.start_time }}</p>
                                <p>پایان: {{ campaign.end_time }}</p>
                                
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
                campaigns: [

                ],
                loading: false
            };
        },
        methods: {
            getCampaigns(){
                this.loading = true;
                var vinst = this;
                axios.get(this.$store.state.hostUrl + '/api/campaigns/study/').then(response => {
                    console.log(response.data);
                    vinst.campaigns = response.data.results;

                    vinst.campaigns.forEach(function(entry) {              
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
            console.log("sag");
            this.getCampaigns();
        }
    }
</script>

<style scoped>
h1, h4, label, button{
    font-family: tahoma;
}
.panel-body {
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    font-family: 'tahoma', cursive;
    font-size: 16px;
    color: #6e6e6e;
}
</style>