<template>


    <div id="main">
        
      <div class="ui right sidebar inverted vertical menu">
        <a class="item">
          1
        </a>
        <a class="item">
          2
        </a>
        <a class="item">
          3
        </a>
      </div>
      <div class="pusher" dir="rtl">

                <!-- <img class="banner" src="/static/banner1.png" style="width: 100%; margin: 0px;" /> -->
            <div class="ui fixed main menu" id="navbar">
            
                <div class="right item ">
                    <a class="item" id = "Opener"> <i class="content icon"></i> </a>
                    <a class="item">تست</a>
                    <a class="item">گروهک</a>
                </div>
            
            </div>

            <div id="container" class="ui container">
                <router-view></router-view>
            </div>
        
            <app-footer></app-footer>
      </div>

       
    </div>

    

</template>



<script>
    import Header from "./components/Header.vue"
    import Footer from "./components/Footer.vue"
    $(document).ready(function(){
    $('#Opener').click(function(){$('.ui.sidebar').sidebar('toggle')});
    });

    export default {
        components:
        {
            appHeader: Header,
            appFooter: Footer
        }
    }
</script>



<style>
@font-face {
    font-family: IRANSans;
    src: url(/static/fonts/IranSansWeb.ttf) format("ttf");
}

    #main{
      background: url('http://localhost:8080/static/devcom.png');
        padding-top: 400px;
    }
    
    .ui#navbar {
        background: transparent;
    font-family: IRANSans;
    
}
.ui.menu .item {
    color: aliceblue;  
}

.ui.menu .right .item:hover {
    color: aliceblue;  
}

.ui#container{

    min-height: 610px;
    margin-bottom: 40px;
    background-color: white;
   
    box-shadow: 2px 0px 70px 5px rgb(189, 179, 179);
    border-radius: 5px;

    padding: 50px 30px;
    padding-bottom: 0px !important;
}
</style>
