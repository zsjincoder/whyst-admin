<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="800px"
    @on-ok="ok"
    @on-cancel="cancel">
    <div>1121</div>
  </Modal>
</template>

<script>
export default {
  name: 'AddOrModify',
  props: {
    isAdd: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loading: true,
      isShow: false
    }
  },
  computed: {
    title () {
      return this.isAdd ? '新增' : '修改'
    }
  },
  created () {
    this.isShow = true
  },
  methods: {
    // 确定
    ok () {
      this.$emit('closeModal', true)
    },
    // 取消
    cancel () {
      this.$emit('closeModal', false)
    }
  }
}
</script>

<style scoped>

</style>
