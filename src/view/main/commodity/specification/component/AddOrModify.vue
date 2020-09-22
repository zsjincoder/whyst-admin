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
      <FormItem v-if="isAdd"
                label="规格名称："
                prop="name">
        <Input v-model="formItem.name"
               :maxlength="80"
               clearable
               placeholder="请输入商品名称"></Input>
      </FormItem>
      <FormItem label="规格值："
                prop="values">
        <div>
          <Input v-model="value"
                 :maxlength="80"
                 clearable
                 style="width: 180px;margin-right: 10px"
                 placeholder="请输入规格值"></Input>
          <Button type="default"
                  shape="circle"
                  icon="md-add"
                  @click="addValues"></Button>
        </div>
        <div>
          <p v-if="formItem.values.length > 0">规格值列表：</p>
          <div>
            <Tag v-for="(i,k) in formItem.values"
                 :key="k"
                 type="border"
                 color="primary"
                 closable
                 @on-close="delArrayIndex(k)">{{i}}</Tag>
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
import { specification, specificationValue } from '@/api/admin'

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
      value: '',
      // 表单
      formItem: {
        name: '',
        values: []
      },
      // 预览
      imgUrl: null
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增规格' : '新增规格值'
    },
    ruleValidate() {
      return {
        name: [
          { required: this.isAdd, message: '规格名称不能为空', trigger: 'blur' }
        ],
        values: [
          { required: true, type: 'array', message: '规格值不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
  },
  methods: {
    // 新增规格值
    addValues() {
      this.value && this.formItem.values.push(this.value)
      this.value = ''
    },
    // 删除数组元素
    delArrayIndex(index) {
      this.$delete(this.formItem.values, index)
    },
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$delete(this.formItem, 'id')
          this.chooseItem.hasOwnProperty('id') && (this.formItem.id = this.chooseItem.id)
          let Api = this.isAdd ? specification : specificationValue
          Api(this.formItem, 'post').then(res => {
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
