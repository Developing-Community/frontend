<template>


      <div class="ui pusher">
                <router-view></router-view>
        
            <app-footer></app-footer>
      </div>

       

    

</template>



<script>
    import Header from "./components/Header.vue"
    import Footer from "./components/Footer.vue"
    

    export default {
        components:
        {
            appHeader: Header,
            appFooter: Footer
        },
    }
</script>



<style>
@font-face {
    font-family: IRANSans;
    src: url(/static/fonts/IranSansWeb.ttf) format("ttf");
}
.banner{

    box-shadow: 2px 5px 40px 2px rgb(189, 179, 179);
}
    .pusher{
      /* background: url('http://localhost:8080/static/devcom.png'); */
      background-color: #eeeeee;
        padding-top: 0px;

    }
    
    .ui#navbar {
        background: transparent;
    font-family: IRANSans;
    
}
.ui#container{
    margin-top: 150px;
    /* visibility: hidden; */
    min-height: 610px;
    margin-bottom: 40px;
    background-color: white;
   
    box-shadow: 2px 0px 70px 1px rgb(189, 179, 179);
    border-radius: 5px;

    padding: 50px 30px;
    padding-bottom: 0px !important;
}
</style>
