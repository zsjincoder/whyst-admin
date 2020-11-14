<template>
  <div>
    <headers :hasAdd="false"
             :searchData="searchData"
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
      <template slot-scope="{ row, index }" slot="content">
        <div v-html="row.content"></div>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary"
                size="small"
                class="action-btn"
                @click="edit(row)">编辑物流单号
        </Button>
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
        :chooseItem="chooseItem"
        @closeModal="closeModal"></add-or-modify>
    </div>
  </div>
</template>

<script>
import Headers from '_c/hearders/Headers'
import AddOrModify from '@/view/main/order/component/AddOrModify'
import { writeOffLog } from '@/api/admin'

export default {
  name: 'WriteOffLog',
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
          title: '商家名称',
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.merchant ? params.row.merchant.nickname : '')
          }
        },
        {
          title: '核销人姓名',
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            return h('span', params.row.user ? params.row.user.nickname : '')
          }
        },
        {
          title: '核销商品名',
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.goods ? params.row.goods.goodsName : '')
          }
        },
        {
          title: '商品图',
          key: 'img',
          minWidth: 100,
          render: (h, params) => {
            return h('img', {
              style: {
                height: '50px',
                verticalAlign: 'middle'
              },
              attrs: { src: params.row.goods ? params.row.goods.image : '' }
            })
          }
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
          width: 120
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
      writeOffLog(this.searchData, 'get').then(res => {
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
    // deleteItem(id) {
    //   banner(id, 'delete').then(res => {
    //     console.log(res)
    //     this.$Message.success('删除成功')
    //     this.getData()
    //   })
    // },
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
