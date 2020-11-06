<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="450px"
    @on-ok="ok"
    @on-cancel="cancel">
    <Form ref="form"
          :model="formItem"
          :rules="ruleValidate"
          :label-width="90">
      <FormItem label="商品单元："
                prop="spuId">
        <Select v-model="formItem.spuId"
                clearable
                filterable
                @on-change="changeUnit">
          <Option v-for="item in unitSelect"
                  :value="item.id"
                  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem v-if="formItem.spuId"
                label="商品规格："
                prop="specValues">
        <Select v-model="specValuesList"
                multiple
                @on-change="changeSpecValues">
          <Option v-for="item in specificationSelect"
                  :value="item.id"
                  :key="item.id">{{ item.value }}</Option>
        </Select>
      </FormItem>
      <FormItem label="商品价格："
                prop="price">
        <InputNumber v-model="formItem.price"
                     clearable
                     style="width: 100%"
                     :min="1"
                     :max="999999999"
                     placeholder="请输入商品价格"></InputNumber>
      </FormItem>
      <FormItem label="商品库存："
                prop="stock">
        <InputNumber v-model="formItem.stock"
                     clearable
                     style="width: 100%"
                     :min="1"
                     :max="999999999"
                     placeholder="请输入商品价格"></InputNumber>
      </FormItem>
      <FormItem label="商品图片："
                prop="image">
        <Upload :action="''"
                :before-upload="previewUpload">
          <div v-if="formItem.image"
               class="img-body">
            <img
              :src="formItem.image"
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
import {
  standardProductUnitSelect,
  standardProductUnitSpecification,
  stockKeepingUnit, stockKeepingUnitDetail,
  uploadFile
} from '@/api/admin'

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
      // 商品单元
      unitSelect: [],
      // 商品规格
      specificationSelect: [],
      specValuesList: [],
      // 表单
      formItem: {
        spuId: null,
        image: '',
        price: null,
        specValues: '',
        stock: null
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
        spuId: [
          { required: true, type: 'number', message: '商品单元不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '商品图片不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, type: 'number', message: '商品价格不能为空', trigger: 'blur' }
        ],
        stock: [
          { required: true, type: 'number', message: '商品库存不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.isShow = true
    this.getStandardProductUnitSelect()
    if (!this.isAdd) {
      this.formItem = JSON.parse(JSON.stringify(this.chooseItem))
      this.getStandardProductUnitDetail()
    }
  },
  mounted() {

  },
  methods: {
    // 获取库存详情
    async getStandardProductUnitDetail() {
      let data = await stockKeepingUnitDetail({ id: this.chooseItem.id }, 'get')
      let { specificationValue } = data
      this.specValuesList = specificationValue.map(item => item.id)
      await this.getSpecificationSelect()
    },
    // 获取商品单元
    async getStandardProductUnitSelect() {
      let res = await standardProductUnitSelect({}, 'get')
      this.unitSelect = res.list
    },
    // 获取商品规格
    async getSpecificationSelect() {
      let res = await standardProductUnitSpecification({ id: this.formItem.spuId }, 'get')
      let data = []
      res.forEach(item => {
        let { name, values } = item
        values.forEach(list => {
          list.value = `${name}->${list.value}`
        })
        data.push(...values)
      })
      this.specificationSelect = data
    },
    // 文件上传
    previewUpload(file) {
      let headers = {
        'Content-Type': 'multipart/form-data;'
      }
      let formData = new FormData()
      formData.append('file', file)
      uploadFile(formData, 'post', headers).then(res => {
        this.formItem.image = res.imgUrl
      })
      return false
    },
    // 删除文件
    closeImg(event) {
      event.stopPropagation()
      this.formItem.image = ''
    },
    // 改变单位
    changeUnit() {
      this.getSpecificationSelect()
    },
    // 改变规格
    changeSpecValues() {
      this.formItem.specValues = this.specValuesList.join(',')
    },
    // 确定
    ok() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          delete this.formItem.specificationValue
          stockKeepingUnit(this.formItem, this.isAdd ? 'post' : 'put').then(res => {
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
  width: 100%;
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
