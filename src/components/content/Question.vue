<template>
  <div>
    <!--LOADING-->
    <div v-if="loadinggg" style="width: 100%; text-align: center;">
      <img style="margin: auto;" src="/static/loading.gif">
    </div>
    <template v-else>
      <div class="ui grid" style="direction: rtl; text-align: right">
        <div class="row">
          <div class="ten wide column">
            <div class="ui ten column grid">
              <div class="row" style="display: block; padding: 0;">
                <span style="float: right">
                  <img
                    class="ui mini image circular"
                    src="http://propile.xpday.net/personas/jan.jpg"
                    alt="AO"
                    style="display: inline"
                  >
                  <a href="#" style="padding-right:0.75em">امیررضا عدومی</a>
                </span>
                <span style="float: left; padding-top: 0.35em;">پرسیده شده در: 7 دی‌ماه 1397</span>
              </div>
              <div class="row" style="padding-bottom:0">
                <h1 class="ui header">عنوان سوال</h1>
              </div>
              <div class="row" style="padding-top:0">
                <div
                  class="ui right aligned basic segment"
                  style="text-align: justify"
                >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.</div>
              </div>
            </div>
          </div>
          <div class="one wide column"></div>
          <div class="five wide column" style="text-align: right">
            <h3 class="ui header">آمار سوال</h3>
            <div class="ui divider"></div>
            <div>آخرین ویرایش در 9 دی‌ماه 1397</div>
            <div style="margin: 1em 0 1em 0">42 بازدید</div>
            <div>مربوط به:</div>
            <div style="padding-right:1em; margin: 1em 0 1em 0">
              <a href="#">Vue</a> /
              <a href="#">Html</a> /
              <a href="#">JavaScript</a>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="ui segment right aligned">
        <div class="ui tiny image circular">
          <img :src="content.author.thumbnail" />
        </div>
        <div class="header">{{ content.title }}</div>
        <div class="description">
          <p>{{ content.author.name }}</p>
        </div>
      </div>


      <div class = "ui container primary segment right aligned" style="padding:10px 30px" v-if="content.content">                
                    <div class = "header" style="padding:7px 10px">{{ content.title }}</div>
                    {{ content.content }}
                    <template v-if='content.type == "QUESTION"'>
                        <div class="ui segment" style="margin-right:30px">
                            <div v-for="answer in content.answers" class="ui segment" style="margin-right:30px">
                                {{answer.content}}
                            </div>
                        </div>
                    </template>
      </div>-->
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: {},
      loading: false
    };
  },
  methods: {
    getContent() {
      this.loading = true;
      var vinst = this;
      var contentUrl =
        this.$store.state.hostUrl +
        "/api/content/get-by-slug/QUESTION/" +
        this.$route.params.q_slug;
      axios
        .get(contentUrl)
        .then(response => {
          console.log(response.data);
          vinst.content = response.data;

          if (vinst.content.image == null) {
            vinst.content.image = "/static/white-image.png";
          }
          vinst.loading = false;
        })
        .catch(err => {
          vinst.loading = false;
        });
    }
  },
  created() {
    this.getContent();
  }
};
</script>

<style scoped>
.panel-body {
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  font-family: "tahoma", cursive;
  font-size: 16px;
  color: #6e6e6e;
}
</style>