<template>
    <div>
            <h1 style="margin:30px; text-align: center;">دوره های مطالعاتی</h1>

            <div  v-if="loading" style="width: 100%; text-align: center;">
                <img style="margin: auto;" src="/static/loading.gif" />
            </div>
            <div style="text-align: center;" v-else>
                <div class="ui special stackable four column cards">
                    <div class="card" v-for="campaign in campaigns">
                        <div class="blurring dimmable image">
                        <div class="ui dimmer">
                            <div class="content">
                            <div class="center">
                                <router-link tag="div" :to="getDetailRoute(campaign)" class="ui inverted button">اطلاعات بیشتر</router-link>
                            </div>
                            </div>
                        </div>
                        <img :src="campaign.image">
                        </div>
                        <div class="content">
                        <a class="header">{{ campaign.title }}</a>
                        <div class="meta">
                            <span class="description">{{ campaign.description }}</span>
                        </div>
                        </div>
                        <div class="extra content">
                        <a>
                            <i class="users icon"></i>
                            {{ campaign.creator }}
                        </a>
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
            getDetailRoute(campaign){
                if(this.$route.name == "list-study")
                    return {name: 'study-partitions', params: { campaign_id: campaign.id }};
                else if(this.$route.name == "list-campaign")
                    return {name: 'detail-campaign', params: { campaign_id: campaign.id }};
                return {};
            },
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
            this.getCampaigns();
        },
        updated(){
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
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