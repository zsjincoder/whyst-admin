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
      <FormItem label="门店名称："
                prop="name">
        <Input v-model.trim="formItem.name"
               :maxlength="80"
               clearable
               placeholder="请输入门店名称"></Input>
      </FormItem>
      <FormItem label="门店logo："
                prop="logo">
        <Upload :action="''"
                :before-upload="previewUpload">
          <div v-if="formItem.logo"
               class="img-body">
            <img
              :src="formItem.logo"
              alt="加载">
            <Icon type="ios-close-circle-outline"
                  :size="30"
                  class="close-img"
                  @click="closeImg"/>
          </div>
          <div v-else
               class="upload-img">
            <Icon type="ios-add"
                  :size="60"/>
          </div>
        </Upload>
      </FormItem>
      <FormItem label="联系电话："
                prop="contactNumber">
        <InputNumber v-model.number="formItem.contactNumber"
                     clearable
                     style="width: 100%"
                     placeholder="请输入联系电话"></InputNumber>
      </FormItem>
      <FormItem label="地址："
                prop="address">
        <Input v-model.trim="formItem.address"
               clearable
               placeholder="请输入地址"></Input>
      </FormItem>
      <FormItem label="简介："
                prop="introduction">
        <Input v-model.trim="formItem.introduction"
               clearable
               placeholder="请输入简介"></Input>
      </FormItem>
      <FormItem label="经度："
                prop="longitude">
        <InputNumber v-model="formItem.longitude"
                     clearable
                     style="width: 100%"
                     placeholder="请输入经度"></InputNumber>
      </FormItem>
      <FormItem label="纬度："
                prop="latitude">
        <InputNumber v-model.number="formItem.latitude"
                     clearable
                     style="width: 100%"
                     placeholder="请输入纬度"></InputNumber>
      </FormItem>
      <FormItem label="备注：">
        <Input v-model="formItem.remark"
               type="textarea"
               :maxlength="200"
               clearable
               placeholder="请输入备注"></Input>
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
import { store, uploadFile } from '@/api/admin'

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
        logo: '',
        contactNumber: null,
        longitude: null,
        latitude: null,
        address: '',
        introduction: '',
        remark: ''
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
          { required: true, message: '门店名称能为空', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: 'logo图片不能为空', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, type: 'number', message: '联系电话不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, type: 'number', message: '经度不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, type: 'number', message: '纬度不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
    if (!this.isAdd) {
      this.formItem = JSON.parse(JSON.stringify(this.chooseItem))
      this.formItem.contactNumber = Number(this.formItem.contactNumber)
      this.formItem.longitude = Number(this.formItem.longitude)
      this.formItem.latitude = Number(this.formItem.latitude)
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
        this.formItem.logo = res.imgUrl
      })
      return false
    },
    // 删除文件
    closeImg(event) {
      event.stopPropagation()
      this.formItem.logo = ''
    },
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          store(this.formItem, this.isAdd ? 'post' : 'put').then(res => {
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
