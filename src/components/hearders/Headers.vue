<template>
  <div class="header-con">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Headers'
}
</script>

<style scoped
       lang="less">
.header-con {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  border:1px #eeeeee solid;
  border-radius: 5px;
  margin-bottom: 10px;

  .ivu-form {
    display: flex;
    align-items: center;

    /deep/.ivu-form-item {
      margin-bottom: 0;
    }

    /deep/.ivu-btn {
      margin-right: 10px;
    }
  }
}
</style>
