<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="1200px"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="form"
          :model="formItem"
          :rules="ruleValidate"
          :label-width="80">
      <FormItem label="标题："
                prop="title">
        <Input v-model="formItem.title"
               :maxlength="80"
               clearable
               placeholder="请输入标题"></Input>
      </FormItem>
      <FormItem label="内容："
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
                @click="ok">确认</Button>
    </div>
  </Modal>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
import { notice } from '@/api/admin'

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
        title: '',
        content: ''
      },
      // 编辑器
      editor: null
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '修改'
    },
    ruleValidate() {
      return {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
  },
  mounted() {
    this.initCKEditor()
  },
  methods: {
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
          this.formItem = JSON.parse(JSON.stringify(this.chooseItem))
          this.editor.setData(this.formItem.content, data)
        }
      }).catch(error => {
        console.error(error)
      })
    },
    // 确定
    ok() {
      this.formItem.content = this.editor.getData()
      this.$refs['form'].validate((valid) => {
        if (valid) {
          notice(this.formItem, this.isAdd ? 'post' : 'put').then(res => {
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
.edit-body {
  width: 100%;
  height: 500px;

  #toolbar-container {
    width: 100%;
  }

  #editor {
    width: 100%;
    height: 500px;
    border: 1px slategray solid;
  }
}
</style>
