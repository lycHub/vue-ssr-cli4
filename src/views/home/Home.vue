<template>
  <div class="home">
    <header class="top-bar new_header bgef header">
      <div class="logo"><img src="../../assets/images/logo.png" alt="租租车"></div>
    </header>
    <div class="kong_h"></div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item of baseInfo.carBanner" :key="item.img">
        <img :src="item.img" />
      </van-swipe-item>
    </van-swipe>
    <div class="zc-box">
      <h1 v-color-swatch="'#73ff4a'">国际租车</h1>
      <div class="form-box">
        <div class="addrs">
          <div class="addr addr-city">
            <span>取车城市</span>
            <p class="content">
              <b>洛杉矶</b>
            </p>
          </div>
          <div class="addr addr-point">
            <span>取车地点</span>
            <p class="content">
              <b>若基亚剧院</b>
            </p>
          </div>
        </div>

        <div class="dts">
          <div class="dt dt-get">
            <div class="title">
              <span>当地取车时间</span>
              <span class="week">周四</span>
            </div>
            <div class="content">
              <p class="date"><b>12月22日</b></p>
              <p class="time">10:00</p>
            </div>
          </div>
          <div class="distance">100天</div>
          <div class="dt dt-back">
            <div class="title">
              <span>当地取车时间</span>
              <span class="week">周四</span>
            </div>
            <div class="content">
              <p class="date"><b>12月22日</b></p>
              <p class="time">10:00</p>
            </div>
          </div>
        </div>
      </div>
      <van-button type="primary" to="/cars">Cars</van-button>
      <ul class="async-data">
        <li v-for="item of baseInfo.btnInfo" :key="item.title">
          <van-button type="primary" to="/cars">{{item.title}}</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import homeServe from '../../service/Home.service';

export default {
  name: 'home',
  metaInfo() {
    return this.$route.meta.metaInfo;
  },
  asyncData({ store }) {
    return store.dispatch('getHomeDatas');
  },
  computed: {
    baseInfo() {
      return this.$store.getters.getBaseInfo
    }
  },
  mounted() {
    homeServe.getTT().then(res => {
      console.log('res', res);
    });
  }
}
</script>
<style lang="less" scoped>
  @import "../../assets/styles/variable.less";
  @import "../../assets/styles/mixins.less";
  .home {
    .top-bar{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      width: 100%;
      background-color: #fbfbfb;
      text-align: center;
      border-bottom: 1px solid #dadada;
      padding: .05rem;
      .logo {
        width: 50%;
      }
    }
    .kong_h {
      height: px2rem(40);
    }
    .zc-box {
      position: relative;
      width: 95%;
      margin: -.3rem auto 0;
      border-radius: 5px;
      background-color: #fff;
      h1 {
        font-size: @font-size-lgx;
        text-align: center;
        padding: .1rem 0;
        color: @font-color-primary;
      }
      .form-box {
        padding: px2rem(15);
        .addrs {
          display: flex;
          margin-bottom: px2rem(20);
          .addr {
            border-bottom: 1px solid @border-prev;
            span {
              font-size: @font-size-normal;
            }
            .content {
              font-size: @font-size-lg;
              color: @font-color-black;
              padding: px2rem(15) 0;
            }
          }
          .addr-city {
            width: px2rem(90);
          }
          .addr-point {
            flex: 1;
            margin-left: px2rem(15);
          }
        }

        .dts {
          display: flex;
          align-items: center;
          .dt {
            flex: 1;
            border-bottom: 1px solid @border-prev;
            .title {
              display: flex;
              justify-content: space-between;
              font-size: @font-size-normal;
            }
            .content {
              display: flex;
              align-content: center;
              font-size: @font-size-lg;
              padding: px2rem(15) 0;
            }
          }
          .distance {
            margin: 0 px2rem(15);
          }
        }
      }
    }
  }
</style>
