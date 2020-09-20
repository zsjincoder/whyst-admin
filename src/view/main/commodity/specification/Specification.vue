<template>
  <div>
    <headers :searchData="searchData"
             @addData="isAdd = true; show = true"
             @queryData="getData">

    </headers>

    <Table :columns="columns"
           :data="tableData"
           :loading="tableLoading"
           border>
      <template slot-scope="{ row, index }" slot="index">
        <span>{{ (index + 1) + (searchData.page - 1) * searchData.limit }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="name">
        <div v-if="inputSelect === index">
          <Input v-model="row.name"
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
          <span style="width: 300px;display: inline-block;margin-right: 10px">{{row.name}}</span>
          <Button size="small"
                  shape="circle"
                  icon="ios-create-outline"
                  class="action-btn"
                  @click="edit(row, index)">
          </Button>
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary"
                size="small"
                class="action-btn"
                @click="edit(row)">新增规格值
        </Button>
        <Poptip
          confirm
          title="确认删除当前数据么？"
          :transfer="true"
          :word-wrap="true"
          @on-ok="deleteItem(row.id)">
          <Button type="error" size="small">删除</Button>
        </Poptip>
      </template>
    </Table>

    <Page v-if="tableData.length > 0"
          :total="searchData.total"
          :current="searchData.page"
          :page-size="searchData.limit"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-sizer/>

    <div v-if="show"
         class="add-or-modify">
      <add-or-modify
        :is-add="isAdd"
        :choose-item="chooseItem"
        @closeModal="closeModal"></add-or-modify>
    </div>
  </div>
</template>

<script>
import Headers from '_c/hearders/Headers'
import AddOrModify from '@/view/main/commodity/specification/component/AddOrModify'
import ExpandTable from '@/view/main/commodity/specification/component/ExpandTable'
import { specification } from '@/api/admin'

export default {
  name: 'Specification',
  components: { AddOrModify, Headers },
  data() {
    return {
      // 查询条件
      searchData: {
        isShow: 1,
        page: 1,
        limit: 10,
        total: 0
      },
      // input选中
      inputSelect: -1,
      inputName: '',
      // 显示新增修改框
      show: false,
      isAdd: false,
      // 选中的行
      chooseItem: null,
      // 表格加载
      tableLoading: false,
      tableData: []
    }
  },
  computed: {
    columns() {
      return [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(ExpandTable, {
              props: {
                tableData: params.row.values
              },
              on: {
                'updateTable': (event) => {
                  let { index, value } = event
                  this.$set(params.row.values[index], 'value', value)
                }
              }
            })
          }
        },
        {
          title: '序号',
          slot: 'index',
          width: 90
        },
        {
          title: '名称',
          slot: 'name'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 150
        },
        {
          title: '更新时间',
          key: 'updateTime',
          width: 150
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 180
        }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 关闭弹窗
    closeModal(flag) {
      this.show = false
      flag && this.getData()
    },
    // 获取数据
    getData() {
      this.tableLoading = true
      specification(this.searchData, 'get').then(res => {
        this.tableLoading = false
        this.tableData = res.list
        this.searchData.total = res.total
      })
    },
    // 编辑数据
    edit(item, index) {
      this.inputName = item.name
      this.inputSelect = index
    },
    // 编辑数据
    ok(item) {
      let { id, name } = item
      specification({ id, name }, 'put').then(res => {
        this.inputSelect = -1
        this.inputName = ''
        this.$Message.success('修改成功')
      })
    },
    // 关闭
    closeInput(index) {
      this.inputSelect = -1
      this.$set(this.tableData[index], 'name', this.inputName)
      this.inputName = ''
    },
    // 删除数据
    deleteItem(id) {
      specification(id, 'delete').then(res => {
        console.log(res)
        this.$Message.success('删除成功')
        this.getData()
      })
    },
    changePage(page) {
      this.searchData.page = page
      this.getData()
    },
    changePageSize(pageSize) {
      this.searchData.limit = pageSize
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>
