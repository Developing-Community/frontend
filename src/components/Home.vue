<template>
<div>
    <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui text container">
            <h1 class="ui inverted header">
              محلی برای یادگیری
                </h1>
            <h2>متناسب با نیازهای جامعه امروزی</h2>
            <div class="ui huge primary button" v-scroll-to="'#start'" style="margin-top:10px;">اطلاعات بیشتر <i class="right arrow icon"></i></div>
        </div>
    </div>

  <div class="ui vertical stripe segment" id="start" style="margin-top: 0px; padding-top:70px;">
    <div class="ui middle aligned stackable grid container">
        <h4 class="ui horizontal header divider" style="text-align: center; width: 100%;">
          <a style="font-size:140%;" href="#">یک کامیونیتی حرفه ای</a>
        </h4>
      <div class="row">
        <div class="ten wide column center aligned">
          <h3 class="ui header">هدف ما</h3>
          <p>با توجه به نقدهای وارد بر نظام آموزشی فعلی و کافی نبودن تحصیلات برای پیشرفت در دنیای امروز، ایده این کامیونیتی در ذهنمان شکل گرفت
            و تصمیم گرفتیم پلتفرمی ایجاد کنیم که ایده ها و استعدادهای شما را به ثمر برساند، بتوانید در کنار دیگر افراد یاد بگیرید و یاد بدهید و در فعالیت های مختلف همکاری کنید. منظور از فعالیت، هر فعالیتی در هر حوزه ای هست. 
                    از یک تحقیق گروهی در علوم انسانی و پایه گرفته تا
                        یک پروژه ی فیلم سازی یا برنامه نویسی
          </p> 
        </div>
        <div class="six wide right floated column">
          <img src="static/white-image.png" class="ui large bordered rounded image">
        </div>
      </div>

        <h4 class="ui horizontal header divider">
          <a href="https://docs.google.com/forms/d/1sGp9mHxO2yGs3Ij-NEozU9JefyIbySCoso96WLEAY8w" style="font-size:140%;">سیستم منتورینگ</a>
        </h4>

      <div class="row centered">
        <div class="eight wide column center aligned">
          <h3 class="ui header">یاد بگیرید، یاد بدهید</h3>
          <p>
            از افراد حرفه ای کامیونیتی راهنمایی بگیرید و مهارت و دانش مورد نیاز خود را کسب کنید. اطراف ما پر از انسان های مستعدی هستند که نیاز به
                  مسیر یادگیری دارند. با تکیه بر دانش و
                  مهارت خود به این افراد در کامیونیتی کمک کنید و همچنین نیروهای
                  حرفه ای مورد نیاز خود را با صرف زمان اندک پرورش دهید.
          </p>
          <a class="ui large button" href="https://docs.google.com/forms/d/1sGp9mHxO2yGs3Ij-NEozU9JefyIbySCoso96WLEAY8w">اطلاعات بیشتر</a>
        </div>
        <div class="eight wide column center aligned">
          <h3 class="ui header">مسیر یادگیریتان را به اشتراک بگذارید</h3>
          <p>
            با به اشتراک‌گذاری مسیر یادگیریتان و تولید محتوای آموزشی، هم برای خودتان رزومه بسازید هم به یادگیری دیگران کمک کنید.
            منابع یادگیری خود را ثبت و به آن ها امتیاز دهید و به دیگران کمک کنید منابع بهتری برای آموزش پیدا کرده و انتخاب کنند
          </p>
        </div>
      </div>

        <h4 class="ui horizontal header divider">
          <a style="font-size:140%;">از ایده تا کار</a>
        </h4>

      <div class="row">
        <div class="six wide column center aligned">
          <h3 class="ui header">بازی با کلمات</h3>
          <p dir="rtl">
            ایده های خود را به اشتراک بگذارید و برای مشکلات خود راه حل بیابید. <span style="font-family: tahoma">brainstrom</span> جایی برای خلافیت شماست
          </p> 
        </div>
        <div class="four wide floated column">
          <img src="static/white-image.png" class="ui large bordered rounded image">
        </div>
        <div class="six wide column center aligned">
          <h3 class="ui header">نیروی کار یا هم تیمی نیاز دارید؟</h3>
          <p>
                            برای انجام فعالیت های تیمی واقعی آماده شدید، 
                        اگر توی کاری به هم تیمی هایی از حوزه
                            خودتون یا حوزه های دیگه نیاز داشتید از طریق 
                        این گروه سابقه گزارش ها و فعالیتشون رو ببینید و 
                        با شناخت نسبی که پیدا کردید بهشون پیشنهاد بدید
                            و نهایتا در قالب تیم با هم کار کنید.
          </p> 
        </div>
      </div>

        <h4 class="ui horizontal header divider">
          <a style="font-size:140%;">برای پیوستن به ما آماده اید؟</a>
        </h4>
      <div class="row centered">
        <router-link :to="{name: 'register'}" tag="a" class="ui large button">ثبت نام و دریافت لینک گروه ها</router-link>
        
      </div>

    </div>
  </div>

</div>
    <!-- <div class="ui container" style="text-align: right">

        <div class="ui stackable two column grid"> 
            <div class=" column">
                <div style="text-align:center;">
                    <h3>هدف ما</h3>
                </div>
                <hr>
                    <div>
                        <p>
                            هدف ما از این کامیونیتی به وجود آوردن یک محیط ساختار
                            یافته هست که بتونید در این محیط یاد بگیرید
                            و در فعالیت ها و تیم های مختلف
                شرکت کنید و با آدمای مختلف در حوزه های مختلف آشنا بشید
                و اگر سوال یا راهنمایی هم خواستید ازشون کمک
                بگیرید. منظور از فعالیت، هر فعالیتی تو هر حوزه ای هست. 
                از یه تحقیق گروهی در علوم انسانی و پایه گرفته تا
                    یک پروژه ی فیلم سازی یا برنامه نویسی
                        </p>
                    </div>
                
            </div>

            <div class="column">
                <div style="text-align:center;">
                    <h3>
                        در حال یادگیری هستید؟
                    </h3>
                </div>
                <hr>
                <div>
                    <p>
                        بعد از وارد شدن به گروه حوزه هایی رو برای
                            یادگیری خودتون انتخاب می کنید و هر هفته
                            از فعالیتی که برای یادگیری اون
        حوزه انجام دادید به بقیه اعضای تیم گزارش می دید.
            گزارش جزئیات خاصی نیاز نداره و میتونه در حد ۴-۵ جمله باشه. مثلا
        این که یه آموزش آنلاین درباره اون حوزه شروع 
        کردید یا یک کتاب دربارش خوندید. البته گزارش دقیق تر برای انتقال
        تجربه یادگیریتون به دیگران بهتر هست
                    </p>
                </div>

                
            </div>
        </div>

        <div class="ui stackable two column grid">
            <div class="column">
                <div style="text-align:center;">
                    <h3>
                        تمایل دارید به یادگیری دیگران کمک کنید؟
                    </h3>
                </div>

                <hr>
                <div>
                    <p>
                      اطراف ما پر از انسان های مستعدی هست که نیاز به
                            مسیر یادگیری دارند. با تکیه بر دانش و
                            مهارت خود به این افراد در کامیونیتی کمک کنید و همچنین نیروهای
                            حرفه ای مورد نیاز خود را با صرف زمان اندک پرورش دهید.
                    </p>
                </div>


                
            </div>
            <div class="column">
                <div style="text-align:center;">
                    <h3>
                        دنبال هم تیمی هستید؟
                    </h3>
                </div>
                <hr>
                <div>
                    <p>
                        وقتی
                            برای انجام فعالیت های تیمی واقعی آماده شدید، 
                        اگر توی کاری به هم تیمی هایی از حوزه
                            خودتون یا حوزه های دیگه نیاز داشتید از طریق 
                        این گروه سابقه گزارش ها و فعالیتشون رو ببینید و 
                        با شناخت نسبی که پیدا کردید بهشون پیشنهاد بدید
                            و نهایتا در قالب تیم با هم کار کنید. سعی کنید
                            گزارش های جذاب بنویسید و فعالیت کنید تا دیگران
                            هم شما رو به عنوان هم تیمی انتخاب کنند
                    </p>
                </div>
                
            </div>
        </div>

    </div> -->
</template>

<script>
export default {};
</script>

<style scoped>
h5 {
  text-align: center;
  color: #2900a8;
  padding-top: 10px;
}
.column p {
  margin-top: 30px;
  line-height:35px;
}
.hidden.menu {
  display: none;
}
.masthead.segment{
  background: url('/static/banner.png');
}
.masthead.segment {
  min-height: 760px;

  background-size: cover;
  padding: 1em 0em;
}
.masthead .logo.item img {
  margin-right: 1em;
}
.masthead .ui.menu .ui.button {
  margin-left: 0.5em;
}
.masthead h1.ui.header {
  margin-top: 3em;
  margin-bottom: 0em;
  font-size: 4em;
  font-weight: normal;
}
.masthead h2 {
  font-size: 1.7em;
  font-weight: normal;
}

.ui.vertical.stripe {
  padding: 8em 0em;
}
.ui.vertical.stripe h3 {
  font-size: 2em;
}
.ui.vertical.stripe .button + h3,
.ui.vertical.stripe p + h3 {
  margin-top: 3em;
}
.ui.vertical.stripe .floated.image {
  clear: both;
}
.ui.vertical.stripe p {
  font-size: 1.33em;
}
.ui.vertical.stripe .horizontal.divider {
  margin: 3em 0em;
}

.quote.stripe.segment {
  padding: 0em;
}
.quote.stripe.segment .grid .column {
  padding-top: 5em;
  padding-bottom: 5em;
}

.footer.segment {
  padding: 5em 0em;
}

.secondary.pointing.menu .toc.item {
  display: none;
}

  .masthead h1.ui.header {
    margin-top: 250px;
  }

@media only screen and (max-width: 700px) {
  .ui.fixed.menu {
    display: none !important;
  }
  .secondary.pointing.menu .item,
  .secondary.pointing.menu .menu {
    display: none;
  }
  .secondary.pointing.menu .toc.item {
    display: block;
  }
  .masthead h1.ui.header {
    margin-top: 200px;
    font-size: 3em;
  }
  .masthead h2 {
    font-size: 1.5em;
  }
}
.menu {
  padding: 30px;
}
</style>
