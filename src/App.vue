<template>


    <div>

        <div class="following bar">
            
            <div class="ui pointing menu">

                <div class="right item ">
                    <a class="item" id = "Opener"> <i class="content icon"></i> </a>
                    <a class="item">گروهک</a>
                    <a class="item">تست</a>
                </div>
            </div>

            <div class="ui sidebar inverted vertical  menu">
                <div class="right item"> Home </div>
                <div class="item">Contact </div>
                <div class="item">about </div>
            </div> 
            
        </div>

        <div style="margin-bottom:30px;">
            <div class="ui container">
            <router-view></router-view>
            </div>
        </div>
        
        <app-footer></app-footer>
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

.ui.menu {
    background-color: rgb(34, 48, 82);
    font-family: IRANSans;
    
}
.ui.menu .item {
    color: aliceblue;  
}

.ui.menu .right .item:hover {
    color: aliceblue;  
}
</style>
