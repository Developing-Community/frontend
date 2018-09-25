<template>


      <div class="ui pusher">

    <div id="top" v-if="$route.name != 'home'" style="height: 1px;"></div>
                <router-view></router-view>
        
            <app-footer></app-footer>
      </div>


</template>



<script>
import Footer from "./components/Footer.vue";

export default {
  components: {
    appFooter: Footer
  },
};
</script>



<style>



@font-face {
    font-family: 'IRANSans';
    src: url('/static/fonts/IRANSansWeb.woff2') format('woff2');
}

p, a, label, h1, h2, h3, h4, h5, h6{
    font-family: "IRANSans";
}
p {
    font-size: 90%;
}

#nav .ui.container .right.item {
  padding: 7px 15px;
}
.menu.secondary {
  border: 0px;
  padding: 10px;
}
.pusher {
  /* background: url('http://localhost:8080/static/devcom.png'); */
  background-color: #eeeeee;
  padding-top: 0px;
}

.ui#navbar {
  background: transparent;
  font-family: IRANSans;
}
.ui#container {
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
