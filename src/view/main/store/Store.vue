<template>
  <div>
    <headers :searchData="searchData"
             @addData="isAdd = true; show = true"
             @queryData="getData">
      <Form :model="searchData"
            :label-width=70
            inline>
        <FormItem label="门店名称:">
          <Input v-model="searchData.name"
                 type="text"
                 clearable
                 placeholder="门店名称"></Input>
        </FormItem>
      </Form>
    </headers>

    <Table :columns="columns"
           :data="tableData"
           :loading="tableLoading"
           border>
      <template slot-scope="{ row, index }" slot="index">
        <span>{{ (index + 1) + (searchData.page - 1) * searchData.limit }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="content">
        <div v-html="row.content"></div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary"
                size="small"
                class="action-btn"
                @click="edit(row)">编辑
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
import AddOrModify from '@/view/main/store/component/AddOrModify'
import { store } from '@/api/admin'

export default {
  name: 'Store',
  components: { AddOrModify, Headers },
  data() {
    return {
      // 查询条件
      searchData: {
        name: '',
        page: 1,
        limit: 10,
        total: 0
      },
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
          title: '序号',
          slot: 'index',
          width: 60
        },
        {
          title: '门店名称',
          key: 'name',
          width: 200,
          tooltip: true
        },
        {
          title: '门店logo',
          key: 'logo',
          width: 120,
          render: (h, params) => {
            return h('img', {
              style: {
                height: '50px',
                verticalAlign: 'middle'
              },
              attrs: { src: params.row.logo }
            })
          }
        },
        {
          title: '联系电话',
          key: 'contactNumber',
          width: 120
        },
        {
          title: '地址',
          key: 'address',
          width: 200,
          tooltip: true
        },
        {
          title: '简介',
          key: 'introduction',
          width: 250,
          tooltip: true
        },
        {
          title: '备注',
          key: 'remark',
          tooltip: true
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
          width: 130
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
      store(this.searchData, 'get').then(res => {
        this.tableLoading = false
        this.tableData = res.list
        this.searchData.total = res.total
      })
    },
    // 编辑数据
    edit(item) {
      this.chooseItem = item
      this.isAdd = false
      this.show = true
    },
    // 删除数据
    deleteItem(id) {
      store(id, 'delete').then(res => {
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
