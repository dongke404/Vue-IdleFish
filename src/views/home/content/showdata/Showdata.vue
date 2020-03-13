<template>
  <div class="container">
    <el-button @click="getallData">所有置顶</el-button>
    <el-button @click="getInprogress">置顶中</el-button>
    <el-button @click="getWaiting">等待置顶</el-button>
    <div class="my-table">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="ticketNo" label="订单号" width="120"></el-table-column>
        <el-table-column prop="name" label="闲鱼名"></el-table-column>
        <el-table-column prop="nickname" label="闲鱼昵称"></el-table-column>
        <el-table-column prop="stime" label="开始时间" sortable :sort-method="sortstime"></el-table-column>
        <el-table-column prop="etime" label="结束时间" sortable :sort-method="sortetime"></el-table-column>
        <el-table-column prop="channel" label="支付方式" width="100"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="notes" label="备注"></el-table-column>
        <el-table-column prop="modify" label="修改">
          <template slot-scope="scope">
            <el-button @click="modifyRow(scope.row)" type="text" size="small">修改</el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index,scope.row, tableData)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <Modify :userInfo="userInfo"></Modify>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatedata">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Modify from "./Modify";
import { reqData, modifyData, delData } from "../../../../api";
import { Message } from "element-ui";
export default {
  components: {
    Modify
  },
  data() {
    return {
      activeName: "first",
      tableData: [],
      allData: [],
      dialogVisible: false,
      userInfo: {},
      clickEle: {}
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //请求数据
    async getdata() {
      let result = await reqData();
      let data = result.data;
      data.sort((a, b) => {
        return new Date(b.etime).getTime() - new Date(a.etime).getTime();
      });
      this.allData = data;
      this.tableData = data;
    },
    //修改数据
    async updatedata() {
      let result = await modifyData(this.userInfo);
      if (result.status === 0) {
        Message.info(result.msg);
        this.dialogVisible = false;
      } else {
        Message.error(result.msg);
      }
    },
    deleteRow(index, row, rows) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let result = await delData(row.ticketNo);
          if (result.status === 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            rows.splice(index, 1);
          } else {
            Message.error(result.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    tableRowClassName({ row, rowIndex }) {
      let stime = new Date(row.stime).getTime();
      let etime = new Date(row.etime).getTime();
      let curtime = new Date().getTime();
      if (stime < curtime && curtime < etime) {
        return "success-row";
      }
      return "";
    },
    getInprogress() {
      this.tableData = this.allData.filter(item => {
        let stime = new Date(item.stime).getTime();
        let etime = new Date(item.etime).getTime();
        let curtime = new Date().getTime();
        return stime < curtime && curtime < etime;
      });
    },
    getallData() {
      this.tableData = this.allData;
    },
    getWaiting() {
      this.tableData = this.allData.filter(item => {
        let stime = new Date(item.stime).getTime();
        let curtime = new Date().getTime();
        return stime > curtime;
      });
    },
    sortstime(a, b) {
      return new Date(a.stime).getTime() - new Date(b.stime).getTime();
    },
    sortetime(a, b) {
      return new Date(a.etime).getTime() - new Date(b.etime).getTime();
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //点击修改
    modifyRow(e) {
      this.dialogVisible = true;
      let userInfo = { ...e };
      console.log(userInfo);
      this.userInfo = userInfo;
    }
  }
};
</script>

<style scoped>
.my-table {
  height: calc(100vh - 250px);
  overflow: auto;
}
</style>