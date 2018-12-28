<template>
  <div class="ui pusher">
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>



<script>
import Footer from "./components/Footer.vue";
export default {
  components: {
    appFooter: Footer
  }
};
</script>



<style>
/* @font-face {
    font-family: 'IRANSans';
    src: url('/static/fonts/IRANSansWeb.woff2') format('woff2');
} */

@font-face {
  font-family: "IRANSans";
  src: url("/static/fonts/");
  src: url("/static/fonts/iransans/IRANSansWeb.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-8 */ url("/static/fonts/iransans/IRANSansWeb.woff2") format("woff2"),
    /* FF39+,Chrome36+, Opera24+*/
      url("/static/fonts/iransans/IRANSansWeb.woff") format("woff"),
    /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url("/static/fonts/iransans/IRANSansWeb.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "IRANSans-light";
  src: url("/static/fonts/");
  src: url("/static/fonts/iransans/IRANSansWeb_Light.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-8 */ url("/static/fonts/iransans/IRANSansWeb_Light.woff2")
      format("woff2"),
    /* FF39+,Chrome36+, Opera24+*/
      url("/static/fonts/iransans/IRANSansWeb_Light.woff") format("woff"),
    /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url("/static/fonts/iransans/IRANSansWeb_Light.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "IRANSans-medium";
  src: url("/static/fonts/");
  src: url("/static/fonts/iransans/IRANSansWeb_Medium.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-8 */ url("/static/fonts/iransans/IRANSansWeb_Medium.woff2")
      format("woff2"),
    /* FF39+,Chrome36+, Opera24+*/
      url("/static/fonts/iransans/IRANSansWeb_Medium.woff") format("woff"),
    /* FF3.6+, IE9, Chrome6+, Saf5.1+*/
      url("/static/fonts/iransans/IRANSansWeb_Medium.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 10px;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    color-stop(0.44, rgb(117, 28, 235)),
    color-stop(0.72, rgb(182, 28, 221)),
    color-stop(0.86, rgb(139, 38, 221))
  );
}

p,
a,
label,
h1,
h2,
h3,
h4,
h5,
h6,
input,
button,
body {
  font-family: "IRANSans" !important;
}
p {
  font-size: 90%;
}

.ui.menu .item > i.dropdown.icon {
  margin: 0 0.5em 0 0;
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

.slide-enter-active {
  animation: slide-in 0.3s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
