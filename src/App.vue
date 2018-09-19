<template>


    <div>
        
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

body{
    background: url('/static/devcom.png');
}

.ui#navbar {
    background-color: transparent;
    font-family: IRANSans;
    
}
.ui.menu .item {
    color: aliceblue;  
}

.ui.menu .right .item:hover {
    color: aliceblue;  
}

.ui#container{

    margin-top: 450px;
    min-height: 700px;
    background-color: white;

    /* -webkit-filter-back: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px); */

    padding: 50px 30px;
}
</style>
