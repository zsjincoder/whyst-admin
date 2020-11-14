<template>
  <div>
    <headers :hasAdd="false"
             :searchData="searchData"
             :hasTime="false"
             @addData="isAdd = true; show = true"
             @queryData="getData">
      <FormItem label="手机号码：">
        <Input v-model="searchData.phone"
               type="text"
               clearable
               placeholder="手机号码"></Input>
      </FormItem>
      <FormItem label="昵称查询：">
        <Input v-model="searchData.nickname"
               type="text"
               clearable
               placeholder="昵称查询"></Input>
      </FormItem>
    </headers>

    <Table :columns="columns"
           :data="tableData"
           :loading="tableLoading"
           border>
      <template slot-scope="{ row, index }" slot="index">
        <span>{{ (index + 1) + (searchData.page - 1) * searchData.limit }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="freeze">
        <i-switch :value="row.isFrozen === 1" @on-change="changeSwitch(row)">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </template>
      <template slot-scope="{ row, index }" slot="role">
        <i-switch :value="row.isMerchant" @on-change="(value) => changeRoleSwitch(row,value)">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary"
                size="small"
                class="action-btn"
                @click="review1(row)">升级
        </Button>
        <Button type="primary"
                size="small"
                class="action-btn"
                @click="review(row)">查看关系树
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
    <div v-if="show1"
         class="add-or-modify">
      <Leave
        :is-add="false"
        :chooseItem="chooseItem"
        @closeModal1="closeModal"></Leave>
    </div>
  </div>
</template>

<script>
import Headers from '_c/hearders/Headers'
import AddOrModify from '@/view/main/user/component/AddOrModify'
import { getUserList } from '@/api/admin'
import Leave from '@/view/main/user/component/leave'

export default {
  name: 'User',
  components: { Leave, AddOrModify, Headers },
  data() {
    return {
      // 查询条件
      searchData: {
        phone: '',
        nickname: '',
        page: 1,
        limit: 10,
        total: 0
      },
      // 显示新增修改框
      show: false,
      show1: false,
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
          title: '用户昵称',
          key: 'nickname',
          tooltip: true,
          minWidth: 150
        },
        {
          title: '用户姓名',
          key: 'realName',
          tooltip: true,
          minWidth: 150
        },
        {
          title: '手机号码',
          key: 'phone',
          tooltip: true,
          minWidth: 150
        },
        {
          title: '关注公众号',
          tooltip: true,
          minWidth: 100,
          render: (h, params) => {
            let arr = ['是', '否']
            return h('span', arr[params.row.isSubscribe])
          }
        },
        {
          title: 'openid',
          key: 'openid',
          tooltip: true,
          minWidth: 150
        },
        {
          title: '性别',
          tooltip: true,
          minWidth: 80,
          render: (h, params) => {
            let arr = ['男', '女']
            return h('span', arr[params.row.sex - 1])
          }
        },
        {
          title: '会员等级',
          key: 'levelName',
          tooltip: true,
          minWidth: 100
        },
        {
          title: '当前积分',
          key: 'integral',
          tooltip: true,
          minWidth: 100
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
          title: '是否冻结',
          slot: 'freeze',
          fixed: 'right',
          width: 90
        },
        {
          title: '是否商家',
          slot: 'role',
          fixed: 'right',
          width: 90
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          fixed: 'right',
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
      this.show1 = false
      flag && this.getData()
    },
    // 获取数据
    getData() {
      this.tableLoading = true
      getUserList(this.searchData, 'get').then(res => {
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
    // 审核
    review1(item) {
      this.chooseItem = item
      this.show1 = true
    },
    // 是否冻结
    changeSwitch(row) {
      let fro = row.isFrozen === 1 ? 0 : 1
      getUserList({ isFrozen: fro, id: row.id }, 'put').then(res => {
        this.$Message.success('操作成功！')
        this.getData()
      })
    },
    // 设为商家
    changeRoleSwitch(row, value) {
      getUserList({ roles: [value ? 4 : 0], id: row.id }, 'put').then(res => {
        this.$Message.success('操作成功！')
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
