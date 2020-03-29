<template>
  <div>
    <p>鱼塘公告</p>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="Infos.bulletin"></el-input>
    <p>置顶规则</p>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="Infos.rule"></el-input>
    <p>联系方式</p>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="Infos.contact"></el-input>
   <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { modifyWx,getWx } from "@/api"
import { Message } from "element-ui";
export default {
  data() {
    return {
      Infos:{
        name:"infos",
        bulletin: "",
        rule:"",
        contact:""
      }
    };
  },
  mounted() {
    this.getdata();
  },
  methods:{
    async getdata() {
      let result = await getWx();
      if (result.status === 0) {
        this.Infos=result.data
      } else {
        Message.error(result.msg);
      }
    },
    async updatedata() {
      let result = await modifyWx(this.Infos);
      if (result.status === 0) {
        Message.info(result.msg);
      } else {
        Message.error(result.msg);
      }
    },
    submit(){
      this.updatedata()
    }
  }
  
  
};
</script>

<style>
</style>