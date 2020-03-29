<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form label-position="left" label-width="80px">
      <el-form-item label="闲鱼名">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="闲鱼昵称">
        <el-input v-model="userInfo.nickname"></el-input>
      </el-form-item>
      <el-form-item label="微信号">
        <el-input v-model="userInfo.wxname"></el-input>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select v-model="userInfo.channel" placeholder="请选择支付方式">
          <el-option label="微信" value="微信"></el-option>
          <el-option label="支付宝" value="支付宝"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="userInfo.money"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input v-model="userInfo.stime"></el-input>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-input v-model="userInfo.etime"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="userInfo.notes"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
};
</script>

<style>
</style>