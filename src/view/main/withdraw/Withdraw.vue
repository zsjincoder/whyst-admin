<template>
  <div>
    <headers :hasAdd="false"
             :searchData="searchData"
             @addData="isAdd = true; show = true"
             @queryData="getData">
      <FormItem label="手机号码：">
        <Input v-model="searchData.phone"
               type="text"
               clearable
               placeholder="手机号码"></Input>
      </FormItem>
      <FormItem label="提现订单号：">
        <Input v-model="searchData.tradeNo"
               type="text"
               clearable
               placeholder="提现订单号"></Input>
      </FormItem>
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
                @click="review(row)">审核
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

    <Modal title="查看收款码" v-model="visible">
      <img :src="imgUrl" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import Headers from '_c/hearders/Headers'
import AddOrModify from '@/view/main/withdraw/component/AddOrModify'
import { withdraw } from '@/api/admin'

export default {
  name: 'Withdraw',
  components: { AddOrModify, Headers },
  data() {
    return {
      // 查询条件
      searchData: {
        phone: '',
        tradeNo: '',
        page: 1,
        limit: 10,
        total: 0
      },
      // 显示新增修改框
      show: false,
      isAdd: false,
      visible: false,
      imgUrl: '',
      // 选中的行
      chooseItem: null,
      // 表格加载
      tableLoading: false,
      tableData: [],
      columns: [
        {
          title: '序号',
          slot: 'index',
          width: 60
        },
        {
          title: '提现订单号',
          key: 'tradeNo',
          tooltip: true,
          minWidth: 280
        },
        {
          title: '提现积分',
          key: 'integral',
          tooltip: true,
          minWidth: 150
        },
        {
          title: '提现后积分',
          key: 'nowIntegral',
          tooltip: true,
          minWidth: 150
        },
        {
          title: '提现状态',
          tooltip: true,
          minWidth: 100,
          render: (h, params) => {
            let arr = ['待审核', '通过', '拒绝']
            return h('span', arr[params.row.status])
          }
        },
        {
          title: '用户昵称',
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.user.nickname ? params.row.user.nickname : '')
          }
        },
        {
          title: '用户姓名',
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.user.realName ? params.row.user.realName : '')
          }
        },
        {
          title: '用户当前积分',
          tooltip: true,
          minWidth: 150,
          render: (h, params) => {
            return h('span', params.row.user.integral ? params.row.user.integral : '')
          }
        },
        {
          title: '收款码',
          minWidth: 150,
          render: (h, params) => {
            let src = params.row.openid ? params.row.openid : ''
            let srcArr = src.split(',')
            let div = h('div', {
              style: {
                display: 'flex',
                justifyContent: 'center'
              }
            }, srcArr.map(i => {
              let img = h('img', {
                style: {
                  height: '50px',
                  verticalAlign: 'middle',
                  cursor: 'pointer'
                },
                attrs: { src: i, title: '点击查看付款码' },
                on: {
                  click: () => {
                    this.imgUrl = i
                    this.visible = true
                  }
                }
              })
              return img
            }))

            let span = h('span', params.row.openid)
            return params.row.openid.indexOf('http') !== -1 ? div : span
          }
        },
        {
          title: '备注',
          key: 'remark',
          minWidth: 120,
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
          fixed: 'right',
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
      withdraw(this.searchData, 'get').then(res => {
        this.tableLoading = false
        this.tableData = res.list
        this.searchData.total = res.total
      })
    },
    // 审核
    review(item) {
      this.chooseItem = item
      this.isAdd = false
      this.show = true
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
