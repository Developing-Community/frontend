<template>


      <div class="ui pusher">
                <router-view></router-view>
        
            <app-footer></app-footer>
      </div>

       

    

</template>



<script>
    import Header from "./components/Header.vue"
    import Footer from "./components/Footer.vue"
    
    $(document).ready(function () {
            $('#right-menu').first()
                .sidebar('setting', { transition: 'push' })
                .sidebar('attach events', '.mobile-button');

            var $div = document.getElementById("nav");
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
            var div_style = $div.style; // short cut to actually adding styles
            var color1, color2;

            // sets next current and next index of gradients array
            function set_next(num) {
                return (num + 1 < gradients.length) ? num + 1 : 0;
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
                            rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i], rgb_values[key][i]);
                        }
                    }
                }
            }

            // update current rgb vals, update DOM element with new CSS background
            function updateGradient() {
                // update the current rgb vals
                for (var key in rgb_values) {
                    if (rgb_values.hasOwnProperty(key)) {
                        for (var i = 0; i < 3; i++) {
                            rgb_values[key][i] += rgb_steps[key][i];
                        }
                    }
                }

                // generate CSS rgb values
                var t_color1 = "rgb(" + (rgb_values.start[0] | 0) + "," + (rgb_values.start[1] | 0) + "," + (rgb_values.start[2] | 0) + ")";
                var t_color2 = "rgb(" + (rgb_values.stop[0] | 0) + "," + (rgb_values.stop[1] | 0) + "," + (rgb_values.stop[2] | 0) + ")";
                if($(window).scrollTop() == 0){
                    return;
                }
                // has anything changed on this interation
                if (t_color1 != color1 || t_color2 != color2) {

                    // update cols strings
                    color1 = t_color1;
                    color2 = t_color2;

                    // update DOM element style attribute
                    div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from(" + color1 + "), to(" + color2 + "))";
                    for (var i = 0; i < 4; i++) {
                        div_style.backgroundImage = prefixes[i] + "linear-gradient(45deg, " + color1 + ", " + color2 + ")";
                    }
                }

                // we did another step
                steps_count++;
                // did we do too many steps?
                if (steps_count > steps_total) {
                    return;
                }

                if (div_style.backgroundImage.indexOf("gradient") != -1 && $(window).scrollTop() != 0) {
                    window.requestAnimationFrame(updateGradient)
                }
            }

            var x = 1;
            $(window).scroll(function () {
                if ($(window).scrollTop() == 0) {
                    $(".menu.secondary").animate({ padding: '10px' }, "fast").css("border-bottom", "0px").css("background", "none");
                    x = 1;
                }
                else if (x == 1) {
                    $(".menu.secondary").animate({ padding: '0px' }, "fast").css("border-bottom", "1px solid gray");
                    // target to give background to



                    // reset steps count
                    steps_count = 0;
                    // set new indexs
                    currentIndex = set_next(currentIndex);
                    nextIndex = set_next(nextIndex);
                    // calc steps
                    calc_steps();

                    // go go go!

                    x = 0;
                    window.requestAnimationFrame(updateGradient);
                }
            });

        });

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
#nav .ui.container .right.item {
    padding: 7px 15px;
}
#nav {
    border: 0px;
    padding: 10px;
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
