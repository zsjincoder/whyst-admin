<template>
  <Modal
    v-model="isShow"
    :title="title"
    :mask-closable="false"
    :scrollable="true"
    width="550px"
    @on-ok="ok"
    @on-cancel="cancel">
    <Tree :data="data3" :load-data="loadData" expand-node></Tree>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button type="primary"
              @click="ok">确认
      </Button>
    </div>
  </Modal>
</template>

<script>
import { getUserList, withdraw } from '@/api/admin'

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
      isStatus: true,
      loading: true,
      isShow: false,
      // 表单
      data3: []
    }
  },
  computed: {
    title() {
      return this.isAdd ? '新增' : '人员关系'
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
      this.$refs['form'].validate((valid) => {
        if (valid) {
          withdraw(this.formItem, 'put').then(res => {
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
