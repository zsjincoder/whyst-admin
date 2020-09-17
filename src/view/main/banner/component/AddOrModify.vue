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
      <FormItem label="跳转链接："
                prop="url">
        <Input v-model="formItem.url"
               :maxlength="80"
               clearable
               placeholder="请输入跳转链接"></Input>
      </FormItem>
      <FormItem label="图片："
                prop="img">
        <Upload :action="''"
                :before-upload="previewUpload">
          <div v-if="imgUrl"
               class="img-body">
            <img
              :src="imgUrl"
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
      <FormItem label="排序：">
        <InputNumber v-model="formItem.sort"
                     clearable
                     style="width: 100%"
                     placeholder="请输入排序"></InputNumber>
      </FormItem>
      <FormItem label="是否显示：">
        <Select v-model="formItem.is_show">
          <Option v-for="item in $global.isShow"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
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
import { banner } from '@/api/admin'

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
        url: '',
        img: null,
        sort: 0,
        is_show: 1,
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
        url: [
          { required: true, message: '跳转链接不能为空', trigger: 'blur' }
        ],
        img: [
          { required: true, type: 'object', message: '图片不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
  },
  mounted() {

  },
  methods: {
    // 文件上传
    previewUpload(file) {
      this.formItem.img = file
      this.imgUrl = window.URL.createObjectURL(file)
      return false
    },
    // 删除文件
    closeImg(event) {
      event.stopPropagation()
      this.imgUrl = ''
      this.formItem.img = null
    },
    // 确定
    ok() {
      let headers = {
        'Content-Type': 'multipart/form-data;'
      }
      let formData = new FormData()
      console.log(this.formItem)
      Object.keys(this.formItem).forEach(key => {
        console.log(key)
        formData.append(key, this.formItem[key])
      })
      this.$refs['form'].validate((valid) => {
        if (valid) {
          banner(this.formItem, this.isAdd ? 'post' : 'put', headers).then(res => {
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
