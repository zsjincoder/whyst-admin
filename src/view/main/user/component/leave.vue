<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="350px"
    @on-ok="ok"
    @on-cancel="cancel">
    <span>会员等级：</span>
    <Select v-model="model1" style="width:200px">
      <Option v-for="item in List" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary"
              @click="ok">确认
      </Button>
    </div>
  </Modal>
</template>

<script>
import { getUserList } from '@/api/admin'

export default {
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
      List: [
        { label: '普通用户', value: 1 },
        { label: 'vip会员', value: 2 },
        { label: '至尊会员', value: 3 },
        { label: '合伙人', value: 4 }
      ],
      model1: 1
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '更改会员等级'
    },
    ruleValidate() {
      return {}
    }
  },
  created() {
    this.isShow = true
    if (!this.isAdd) {
      let item = JSON.parse(JSON.stringify(this.chooseItem))
      this.getData(item.id).then(res => {
        this.data3 = res
      })
    }
  },
  mounted() {

  },
  methods: {
    loadData(item, callback) {
      console.log(item)
      let list = this.getData(item.id)
      callback(list)
    },
    async getData(id) {
      let array = []
      let { list } = await getUserList({ limit: 1000, page: 1, up_id: id }, 'get')
      list.forEach(i => {
        let item = {
          title: i.nickname + `(${i.realName || '暂无'})`,
          loading: false,
          id: i.id,
          children: []
        }
        array.push(item)
      })
      return array
    },
    // 确定
    ok() {
      getUserList({ memberLevel: this.model1, id: this.chooseItem.id }, 'put').then(res => {
        this.$Message.success('操作成功！')
        this.$emit('closeModal1', true)
      })
    },
    // 取消
    cancel() {
      this.$emit('closeModal1', false)
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
