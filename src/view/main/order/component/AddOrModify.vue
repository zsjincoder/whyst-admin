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
      <FormItem label="物流单号："
                prop="final_no">
        <Input v-model="formItem.final_no"
               :maxlength="80"
               clearable
               placeholder="请输入物流单号"></Input>
      </FormItem>
      <FormItem label="物流类型："
                prop="final_type">
        <Select v-model="formItem.final_type"
                filterable>
          <Option v-for="key in Object.keys(fianlList)"
                  :value="key"
                  :key="key"
                  placeholder="请选择物流类型">{{ `${fianlList[key]}(${key})` }}</Option>
        </Select>
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
import fianl from '@/assets/json/fianlType.json'
import { orderList } from '@/api/admin'

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
      loading: true,
      isShow: false,
      // 表单
      formItem: {
        final_no: '',
        final_type: ''
      },
      // 预览
      imgUrl: null
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '编辑物流单号'
    },
    ruleValidate() {
      return {
        final_no: [
          { required: true, message: '请输入物流单号', trigger: 'blur' }
        ],
        final_type: [
          { required: true, message: '请选择物流类型', trigger: 'change' }
        ]
      }
    },
    fianlList() {
      return fianl
    }
  },
  created() {
    this.isShow = true
    if (!this.isAdd) {
      let item = JSON.parse(JSON.stringify(this.chooseItem))
      console.log(item)
      this.formItem.id = item.id
      this.formItem.final_no = item.finalNo
      this.formItem.final_type = item.finalType
    }
  },
  mounted() {

  },
  methods: {
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          orderList(this.formItem, 'put').then(res => {
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
