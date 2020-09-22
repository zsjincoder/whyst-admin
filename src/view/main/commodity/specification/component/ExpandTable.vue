<template>
  <Table :columns="columns"
         :data="tableData"
         border>
    <template slot-scope="{ row, index }" slot="index">
      <span>{{ (index + 1)}}</span>
    </template>
    <template slot-scope="{ row, index }" slot="value">
      <div v-if="inputSelect === index">
        <Input v-model="inputValue"
               style="width: 300px;margin-right: 10px"></Input>
        <Button size="small"
                shape="circle"
                icon="md-checkmark"
                class="action-btn"
                @click="ok(row, index)">
        </Button>
        <Button size="small"
                shape="circle"
                icon="md-close"
                class="action-btn"
                @click="closeInput(index)">
        </Button>
      </div>
      <div v-else>
        <span style="width: 300px;display: inline-block;margin-right: 10px">{{row.value}}</span>
        <Button size="small"
                shape="circle"
                icon="ios-create-outline"
                class="action-btn"
                @click="edit(row, index)">
        </Button>
      </div>
    </template>
    <template slot-scope="{ row, index }" slot="action">
      <Poptip
        confirm
        title="确认删除当前数据么？"
        :transfer="true"
        :word-wrap="true"
        @on-ok="deleteItem(row.id, index)">
        <Button type="error" size="small">删除</Button>
      </Poptip>
    </template>
  </Table>
</template>

<script>
import { specificationValue } from '@/api/admin'

export default {
  name: 'ExpandTable',
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // input选中
      inputSelect: -1,
      inputName: '',
      inputValue: ''
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '序号',
          slot: 'index',
          width: 90
        },
        {
          title: '规格值',
          slot: 'value'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 130
        }
      ]
    }
  },
  methods: {
    // 编辑数据
    edit(item, index) {
      this.inputName = item.value
      this.inputValue = item.value
      this.inputSelect = index
    },
    ok(item, index) {
      let { id } = item
      specificationValue({ id, value: this.inputValue }, 'put').then(res => {
        this.$emit('updateTable', { index, value: this.inputValue })
        this.inputSelect = -1
        this.inputName = ''
        this.inputValue = ''
        this.$Message.success('修改成功')
      })
    },
    // 关闭
    closeInput(index) {
      this.inputSelect = -1
      this.inputValue = this.inputName
      this.inputName = ''
      this.$forceUpdate()
    },
    deleteItem(id, index) {
      specificationValue(id, 'delete').then(res => {
        this.$Message.success('删除成功')
        this.$emit('deleteTableItem', { index })
      })
    }
  }
}
</script>

<style scoped>

</style>
