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
      <FormItem label="问题："
                prop="question">
        <Input v-model.trim="formItem.question"
               type="textarea"
               clearable
               :rows="3"
               placeholder="请输入门店名称"></Input>
      </FormItem>
      <FormItem label="回答："
                prop="answer">
        <Input v-model.trim="formItem.answer"
               type="textarea"
               clearable
               :rows="6"
               placeholder="请输入门店名称"></Input>
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
import { question } from '@/api/admin'

export default {
  name: 'AddOrModify',
  props: {
    isAdd: {
      type: Boolean,
      default: true
    },
    chooseItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: true,
      isShow: false,
      // 表单
      formItem: {
        question: '',
        answer: ''
      },
      // 预览
      imgUrl: null
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '修改'
    },
    ruleValidate() {
      return {
        question: [
          { required: true, message: '问题不能为空', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '回答不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
    if (!this.isAdd) {
      this.formItem = JSON.parse(JSON.stringify(this.chooseItem))
    }
  },
  mounted() {

  },
  methods: {
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          question(this.formItem, this.isAdd ? 'post' : 'put').then(res => {
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
  width:250px;
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
