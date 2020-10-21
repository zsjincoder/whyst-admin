<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="750px"
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
      <FormItem label="商品规格："
                prop="specifications">
        <Select v-model="specification" multiple
                @on-change="changeSpecificationSelect">
          <Option v-for="item in specificationSelect"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="商品描述：">
        <Input v-model="formItem.description "
               clearable
               type="textarea"
               placeholder="请输入商品描述"></Input>
      </FormItem>
      <FormItem label="是否上架：">
        <i-switch v-model="statusA"/>
      </FormItem>
      <FormItem label="商品详情："
                prop="content">
        <div class="edit-body">
          <!-- 工具栏容器 -->
          <div id="toolbar-container"></div>

          <!-- 编辑器容器 -->
          <div id="editor">

          </div>
        </div>
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
import { specificationSelect, standardProductUnit, standardProductUnitDetail, uploadFile } from '@/api/admin'
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'

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
      // 商品规格
      specificationSelect: [],
      specification: [],
      // 表单
      formItem: {
        name: '',
        description: '',
        lowPrice: 1,
        specifications: '',
        detail: '',
        status: 1
      },
      statusA: true,
      // 富文本
      editor: null
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
        specifications: [
          { required: true, message: '商品规格不能为空', trigger: 'change' }
        ],
        lowPrice: [
          { required: true, type: 'number', message: '商品最低价格不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
    this.getSpecificationSelect()
    !this.isAdd && this.getStandardProductUnitDetail()
  },
  mounted() {
    this.isAdd && this.initCKEditor()
  },
  methods: {
    // 设置商品规格
    changeSpecificationSelect(val) {
      this.formItem.specifications = val ? val.join(',') : ''
    },
    // 获取商品详情
    async getStandardProductUnitDetail() {
      let data = await standardProductUnitDetail({ id: this.chooseItem.id }, 'get')
      let { detail, id, lowPrice, name, specification, description } = data
      this.specification = specification.map(item => item.id)
      this.formItem.id = id
      this.formItem.description = description
      this.formItem.lowPrice = lowPrice
      this.formItem.name = name
      this.formItem.detail = detail
      this.formItem.specifications = this.specification.join(',')
      this.initCKEditor()
    },
    // 获取商品规格
    async getSpecificationSelect() {
      let res = await specificationSelect({}, 'get')
      this.specificationSelect = res.list
    },
    // 初始化 富文本编辑器
    initCKEditor(format, data) {
      CKEditor.create(document.querySelector('#editor'), {
        language: 'zh-cn',
        ckfinder: {
          uploadUrl: '/admin/Upload/uploadUrl'
          // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
        }
      }).then(editor => {
        this.editor = editor // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        const toolbarContainer = document.querySelector('#toolbar-container')
        toolbarContainer.appendChild(editor.ui.view.toolbar.element)
        if (!this.isAdd) {
          this.editor.setData(this.formItem.detail, data)
        }
      }).catch(error => {
        console.error(error)
      })
    },
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
      this.formItem.detail = this.editor.getData()
      this.formItem.status = this.statusA ? 1 : 0
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
#editor {
  width: 100%;
  height: 200px;
  border: 1px slategray solid;
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
