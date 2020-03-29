<template>
  <div class="container">
    <Header></Header>
    <div class="center">
      <Sidebar class="sider"></Sidebar>
      <div class="content-box">
        <div class="crumbs">{{title}}</div>
        <div class="content">
           <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/common/Header";
import Sidebar from "../../components/common/Sidebar";
export default {
  name: "home",
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      title: this.$route.meta.title
    };
  },
  watch: {
    $route(to, from) {
      this.title = to.meta.title;
    }
  },
};
</script>

<style lang="less" scoped>
.center {
  display: flex;
  height: calc(100vh - 70px);

  .content-box {
    box-sizing: border-box;
    width: 100%;
    // height: 100%;
    background: #eeeeee;
    padding: 30px;
   
    .crumbs {
      margin: 0 0 10px 0;
    }
    .content {
      height: calc(100vh - 220px);
      padding: 30px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 5px;
      // overflow: hidden;
    }
  }
}
</style>