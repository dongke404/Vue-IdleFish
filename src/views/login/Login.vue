<template>
  <div class="container">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <el-form ref="login" label-width="0px" class="ms-content">
        <el-form-item>
          <el-input v-model="username" placeholder="username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="password"
            type="password"
            placeholder="password"
            prefix-icon="iconfont icon-password"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="loginhandle">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "../../api/index";
import { setCookie } from "../../utils/index";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async loginhandle() {
      let result = await reqLogin(this.username, this.password);
      if (result.status === 0) {
        this.$message.success("登录成功");
        setCookie("token", result.token, 60 * 60 * 24 * 7);
        // console.log("设置token");
        this.$router.push("/");
      } else {
        this.$message.error(result.msg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: cover;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>