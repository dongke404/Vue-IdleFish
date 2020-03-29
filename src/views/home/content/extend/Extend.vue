<template>
  
  <el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea">
  </el-input>
</template>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>

<style>

</style>