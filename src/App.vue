<template>
    <div>
        <div class="ui sidebar inverted vertical  menu">
            <div class="item"> Home </div>
            <div class="item">Contact </div>
            <div class="item">about </div>
        </div>
        <button id = "Opener" class="contect icon large">weflwpeofjo</button>
        <router-view></router-view>
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

</style>
