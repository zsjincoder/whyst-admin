<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="550px"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="form"
          :model="formItem"
          :rules="ruleValidate"
          :label-width="90">
      <FormItem label="是否通过："
                prop="status">
        <i-switch :value="isStatus"
                  size="large"
                  @on-change="switchChange">
          <span slot="open">通过</span>
          <span slot="close">拒绝</span>
        </i-switch>
      </FormItem>
      <FormItem label="备注："
                prop="final_type">
        <Input v-model="formItem.remark"
               type="text"
               clearable
               placeholder="备注"></Input>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary"
              @click="ok">确认
      </Button>
    </div>
  </Modal>
</template>

<script>
import { withdraw } from '@/api/admin'

export default {
  name: 'AddOrModify',
  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    chooseItem: {
      type: Object
    }
  },
  data() {
    return {
      isStatus: true,
      loading: true,
      isShow: false,
      // 表单
      formItem: {
        status: 1,
        remark: ''
      },
      // 预览
      imgUrl: null
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '审核'
    },
    ruleValidate() {
      return {}
    }
  },
  created() {
    this.isShow = true
    if (!this.isAdd) {
      let item = JSON.parse(JSON.stringify(this.chooseItem))
      this.formItem.id = item.id
    }
  },
  mounted() {

  },
  methods: {
    // switchChange
    switchChange(e) {
      this.formItem.status = e ? 1 : 2
    },
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          withdraw(this.formItem, 'put').then(res => {
            this.$Message.success('操作成功！')
            this.$emit('closeModal', true)
          })
        }
      })
    },
    // 取消
    cancel() {
      this.$emit('closeModal', false)
    }
  }
}
</script>

<style scoped
       lang="less">
  .upload-img {
    width: 100px;
    height: 100px;
    border: 1px #ddd solid;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .img-body {
    position: relative;
    display: inline-block;
    width: 400px;
    height: auto;

    img {
      width: 100%;
      height: 100%;
    }

    .close-img {
      position: absolute;
      top: -10px;
      right: -10px;
      z-index: 9999;
      color: #f89090;
      cursor: pointer;
    }
  }
</style>
