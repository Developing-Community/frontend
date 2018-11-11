<template>
    <div id="nav" class="ui large inverted pointing menu fixed secondary" style="border-bottom: 0px;">
        <div class="backgroundnav">
                <img src="/static/img/Logo.png" id="toplogo"/>
        </div>

        <div class="ui container contentnav">
            <div class="ui icon input desk-only" id="topsearchbar" :class="{faded: fadedSearch, notfaded: !fadedSearch}">
                <i class="search icon"></i>
                <input type="text" placeholder="Search..."  @focus="fadedSearch = false" @blur="fadedSearch = true">
            </div>
            <div class="right item" dir="rtl">
                <a class="item mobile-button mob-only"> <i class="content icon"></i> </a>
                <router-link :to="{name: 'home'}" tag="a" class="item desk-only"><a>خانه</a></router-link>
                <router-link :to="{name: 'groups'}" tag="a" class="item desk-only"><a>لینک گروه ها</a></router-link>
                

                <div class="ui pointing dropdown link item desk-only">
                    <div class="text"><p>ناحیه کاربری</p></div>
                    <i class="dropdown icon"></i>
                    <div class="menu" v-if="isAuthenticated">
                        <router-link :to="{name: 'profile'}" tag="a" class="item">پروفایل</router-link>
                        <router-link :to="{name: 'logout'}" tag="a" class="item">خروج</router-link>
                    </div>
                    <div  class="menu" v-else>
                        <router-link :to="{name: 'register'}" tag="a" class="item">ثبت نام</router-link>
                        <router-link :to="{name: 'login'}" tag="a" class="item">ورود</router-link>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    var animationEnabled = false;
    var animationFinished = true;
    // rgb vals of the gradients
    var gradients = [
        { start: [0, 0, 72], stop: [133, 0, 133] },
        { start: [133, 0, 133], stop: [0, 0, 72] }
    ];
    // how long for each transition
    var transition_time = 4;

    // internal type vars
    var currentIndex = 0; // where we are in the gradients array
    var nextIndex = 1; // what index of the gradients array is next
    var steps_count = 0; // steps counter
    var steps_total = Math.round(transition_time * 60); // total amount of steps
    var rgb_steps = {
        start: [0, 0, 0],
        stop: [0, 0, 0]
    }; // how much to alter each rgb value
    var rgb_values = {
        start: [0, 0, 0],
        stop: [0, 0, 0]
    }; // the current rgb values, gets altered by rgb steps on each interval
    var prefixes = ["-webkit-", "-moz-", "-o-", "-ms-", ""]; // for looping through adding styles
    var color1, color2;

    var x = 1;
    // sets next current and next index of gradients array
    function set_next(num) {
        return num + 1 < gradients.length ? num + 1 : 0;
    }

    // work out how big each rgb step is
    function calc_step_size(a, b) {
        return (a - b) / steps_total;
    }

    // populate the rgb_values and rgb_steps objects
    function calc_steps() {
        for (var key in rgb_values) {
            if (rgb_values.hasOwnProperty(key)) {
                for (var i = 0; i < 3; i++) {
                rgb_values[key][i] = gradients[currentIndex][key][i];
                rgb_steps[key][i] = calc_step_size(
                        gradients[nextIndex][key][i],
                        rgb_values[key][i]
                    );
                }
            }
        }
    }

    // update current rgb vals, update DOM element with new CSS background
    function updateGradient() {
        animationFinished = false;
        // update the current rgb vals
        for (var key in rgb_values) {
            if (rgb_values.hasOwnProperty(key)) {
                for (var i = 0; i < 3; i++) {
                rgb_values[key][i] += rgb_steps[key][i];
                }
            }
        }

        // generate CSS rgb values
        var t_color1 =
        "rgb(" +
        (rgb_values.start[0] | 0) +
        "," +
        (rgb_values.start[1] | 0) +
        "," +
        (rgb_values.start[2] | 0) +
        ")";
        var t_color2 =
        "rgb(" +
        (rgb_values.stop[0] | 0) +
        "," +
        (rgb_values.stop[1] | 0) +
        "," +
        (rgb_values.stop[2] | 0) +
        ")";
        if (!animationEnabled) {
            return;
        }
        // has anything changed on this interation
        if (t_color1 != color1 || t_color2 != color2) {
            // update cols strings
            color1 = t_color1;
            color2 = t_color2;

            // update DOM element style attribute
            document.getElementById("nav").style.backgroundImage =
                "-webkit-gradient(linear, left bottom, right top, from(" +
                color1 +
                "), to(" +
                color2 +
                "))";
            for (var i = 0; i < 4; i++) {
                document.getElementById("nav").style.backgroundImage =
                    prefixes[i] +
                    "linear-gradient(45deg, " +
                    color1 +
                    ", " +
                    color2 +
                    ")";
            }
        }

        // we did another step
        steps_count++;
        // did we do too many steps?
        if (steps_count > steps_total) {
            animationFinished = true;
            return;
        }

        if (
            document.getElementById("nav").style.backgroundImage.indexOf("gradient") != -1 &&
            animationEnabled
        ) {
            window.requestAnimationFrame(updateGradient);
        }
    }

    function refreshNavbar(){
        $(document).ready(function() {
            if ($(window).scrollTop() <= (document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0)) {
                $("#topsearchbar").animate({marginTop: "9px", height: "40px"}, "fast");
                animationEnabled = false;
                if ((document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0) > 0) {
                    $("#toplogo").css("opacity", "0");
                    $(".menu.secondary")
                    .animate({ paddingTop: "10px", paddingBottom: "10px" , opacity: "1" }, "fast")
                    .css("border-bottom", "0px")
                    .css("background", "none");
                } else {
                    $("#toplogo").animate({opacity: 0}, 150);    
                    $(".menu.secondary").animate({ paddingTop: "10px", paddingBottom: "10px" }, "fast");
                    animationEnabled = true;
                    if (animationFinished) {
                        // reset steps count
                        steps_count = 0;
                        // set new indexs
                        currentIndex = set_next(currentIndex);
                        nextIndex = set_next(nextIndex);
                        // calc steps
                        calc_steps();
                    }
                    // go go go!
                    window.requestAnimationFrame(updateGradient);
                }
                x = 1;
            }
            else {
                $("#topsearchbar").animate({marginTop: "12px", height: "35px"}, "fast");
                $("#toplogo").animate({opacity: 0.65});
                if ((document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0) > 0) {
                    $(".menu.secondary")
                    .css("opacity", "0")
                    .animate({ padding: "0px", opacity: "1" }, "fast")
                    .css("border-bottom", "1px solid gray");
                } else {
                    $(".menu.secondary").animate({ paddingTop: "0px", paddingBottom: "0px" }, "fast");
                }
                animationEnabled = true;
                if (animationFinished) {
                    // reset steps count
                    steps_count = 0;
                    // set new indexs
                    currentIndex = set_next(currentIndex);
                    nextIndex = set_next(nextIndex);
                    // calc steps
                    calc_steps();
                }
                // go go go!
                window.requestAnimationFrame(updateGradient);
                x = 0;
            }
        });
    };
    export default {
        data() {
            return {
                fadedSearch: true
            };
        },
        watch:{
            $route (to, from){
                refreshNavbar();
            },
        },
        computed:{
            isAuthenticated(){
                return this.$store.getters.isAuthenticated;
            }
        },
        created() {
            var vinst = this;
            $(document).ready(function() {
                window.onresize = refreshNavbar();
                $(".dropdown").dropdown();
                if ((document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0) == 0) {
                        $(".menu.secondary")
                        .css("border-bottom", "1px solid gray");
                    animationEnabled = true;
                    // reset steps count
                    steps_count = 0;
                    // set new indexs
                    currentIndex = set_next(currentIndex);
                    nextIndex = set_next(nextIndex);
                    // calc steps
                    calc_steps();

                    // go go go!
                    window.requestAnimationFrame(updateGradient);
                }

                // $(".masthead,#top").visibility({
                //     once: false,
                //     onBottomPassed: function() {
                //     if (vinst.$route.name == "home") {
                //         $(".menu.secondary")
                //         .css("opacity", "0")
                //         .animate({ padding: "0px", opacity: "1" }, "fast")
                //         .css("border-bottom", "1px solid gray");
                //     } else {
                //         $(".menu.secondary").animate({ padding: "0px" }, "fast");
                //     }
                //     animationEnabled = true;
                //     if (animationFinished) {
                //         // reset steps count
                //         steps_count = 0;
                //         // set new indexs
                //         currentIndex = set_next(currentIndex);
                //         nextIndex = set_next(nextIndex);
                //         // calc steps
                //         calc_steps();
                //     }
                //     // go go go!
                //     window.requestAnimationFrame(updateGradient);
                //     },
                //     onBottomPassedReverse: function() {
                //     animationEnabled = false;
                //     if (vinst.$route.name == "home") {
                //         $(".menu.secondary")
                //         .animate({ padding: "10px", opacity: "1" }, "fast")
                //         .css("border-bottom", "0px")
                //         .css("background", "none");
                //     } else {
                //         $(".menu.secondary").animate({ padding: "10px" }, "fast");
                //     }
                //     }
                // });

                $(window).scroll(function () {
                    if ($(window).scrollTop() <= (document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0)) {
                        if(x == 0){
                            $("#topsearchbar").animate({marginTop: "9px", height: "40px"}, "fast");
                            animationEnabled = false;
                            if ((document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0) > 0) {
                                $("#toplogo").css("opacity", "0");
                                $(".menu.secondary")
                                .animate({ paddingTop: "10px", paddingBottom: "10px" , opacity: "1" }, "fast")
                                .css("border-bottom", "0px")
                                .css("background", "none");
                            } else {
                                $("#toplogo").animate({opacity: 0}, 150);
                                $(".menu.secondary").animate({ paddingTop: "10px", paddingBottom: "10px" }, "fast");
                            }
                            x = 1;
                        }
                    }
                    else if (x == 1) {
                        $("#topsearchbar").animate({marginTop: "12px", height: "35px"}, "fast");
                        $("#toplogo").animate({opacity: 0.65});
                        if ((document.getElementById("header") ? Math.max(document.getElementById("header").offsetHeight - 80, 0) : 0) > 0) {
                            $(".menu.secondary")
                            .css("opacity", "0")
                            .animate({ paddingTop: "0px", paddingBottom: "0px", opacity: "1" }, "fast")
                            .css("border-bottom", "1px solid gray");
                        } else {
                            $(".menu.secondary").animate({ paddingTop: "0px", paddingBottom: "0px" }, "fast");
                        }
                        animationEnabled = true;
                        if (animationFinished) {
                            // reset steps count
                            steps_count = 0;
                            // set new indexs
                            currentIndex = set_next(currentIndex);
                            nextIndex = set_next(nextIndex);
                            // calc steps
                            calc_steps();
                        }
                        // go go go!
                        window.requestAnimationFrame(updateGradient);
                        x = 0;
                    }
                });
            });
        }
    }
</script>

<style scoped>
/* Mobile */

@media only screen and (min-width: 767px) {
  [class*="mob-only"]{
    display: none !important;
  }
}

@media only screen and (max-width: 767px) {
  [class*="desk-only"]{
    display: none !important;
  }
}

#toplogo {
    width: 70px;
    margin-top: 13px;
    opacity: 0;
}
.contentnav{
    position: relative;
    z-index: 100;
}

.backgroundnav{
    width: 100%;
    text-align: center;
    position: absolute;
    z-index: -100;
}

#nav .dropdown .menu .item{
    text-align: right;
}

.ui .input {
    height: 40px;  margin-top:9px;
}

.faded {
    opacity: 0.7;
}

.notfaded {
    opacity: 0.85;
}

#topsearchbar input {
    border-radius: 1000px;
}
</style>