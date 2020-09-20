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
          :label-width="130">
      <FormItem label="商品名称："
                prop="name">
        <Input v-model="formItem.name"
               :maxlength="80"
               clearable
               placeholder="请输入商品名称"></Input>
      </FormItem>
      <FormItem label="商品最低价格(元)："
                prop="lowPrice">
        <InputNumber v-model="formItem.lowPrice"
                     clearable
                     style="width: 100%"
                     :min="1"
                     :max="999999999"
                     placeholder="请输入商品最低价格"></InputNumber>
      </FormItem>
      <FormItem label="商品描述：">
        <Input v-model="formItem.description "
               clearable
               type="textarea"
               placeholder="请输入商品描述"></Input>
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
import { standardProductUnit, uploadFile } from '@/api/admin'

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
        name: '',
        description: '',
        lowPrice: 1
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
        name: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        lowPrice: [
          { required: true, type: 'number', message: '商品最低价格不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
    if (!this.isAdd) {
      this.formItem = JSON.parse(JSON.stringify(this.chooseItem))
      this.imgUrl = this.formItem.img
      console.log(this.formItem)
    }
  },
  mounted() {

  },
  methods: {
    // 文件上传
    previewUpload(file) {
      let headers = {
        'Content-Type': 'multipart/form-data;'
      }
      let formData = new FormData()
      formData.append('file', file)
      uploadFile(formData, 'post', headers).then(res => {
        this.formItem.img = res.imgUrl
      })
      return false
    },
    // 删除文件
    closeImg(event) {
      event.stopPropagation()
      this.formItem.img = ''
    },
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          standardProductUnit(this.formItem, this.isAdd ? 'post' : 'put').then(res => {
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
