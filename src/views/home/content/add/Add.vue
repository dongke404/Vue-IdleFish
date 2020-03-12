<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="闲鱼名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="闲鱼昵称">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item label="微信号">
      <el-input v-model="form.wxname"></el-input>
    </el-form-item>
    <el-form-item label="支付方式">
      <el-select v-model="form.channel" placeholder="请选择支付方式">
        <el-option label="微信" value="微信"></el-option>
        <el-option label="支付宝" value="支付宝"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="支付金额">
      <el-input v-model="form.money"></el-input>
    </el-form-item>
    <el-form-item label="开始时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.stime1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.stime2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="结束时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.etime1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.etime2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="备注">
      <el-input type="textarea" v-model="form.notes"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addData } from "../../../../api";
import { formateDate, formateTime } from "../../../../utils";
import { Message } from "element-ui";

export default {
  data() {
    return {
      form: {
        name: "",
        nickname: "",
        wxname: "",
        channel: "",
        money: "",
        stime1: "",
        stime2: "",
        etime1: "",
        etime2: "",
        notes:""
      }
    };
  },
  watch: {
    "form.stime1": function(val) {
      if (val){
      let temp = new Date(val.toString());
      if (this.form.money) {
        console.log(this.form.money)
        let dateTime = temp.setDate(temp.getDate() + parseInt(this.form.money) / 5);
        dateTime = new Date(dateTime);
        this.form.etime1 = dateTime;
      }
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(
        "submit!",
        formateDate(this.form.stime1) + formateTime(this.form.stime2),
        formateDate(this.form.etime1) + formateTime(this.form.etime2)
      ),
        this.toaddData({
          name: this.form.name,
          nickname: this.form.nickname,
          wxname: this.form.wxname,
          channel: this.form.channel,
          money: this.form.money,
          stime:
            formateDate(this.form.stime1) + " " + formateTime(this.form.stime2),
          etime:
            formateDate(this.form.etime1) + " " + formateTime(this.form.etime2),
          notes: this.form.notes
        });
    },
    async toaddData(params) {
      let result = await addData(params);
      if (result.status === 0) {
        Message(result.msg);
      }else{
        Message.error(result.msg)
      }
    }
  }
};
</script>

<style>
</style>