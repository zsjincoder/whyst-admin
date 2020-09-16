<template>
  <div>
    <headers>
      <Form :model="searchData"
            :label-width=70
            inline>
        <FormItem label="公告名称:">
          <Input v-model="searchData.user"
                 type="text"
                 clearable
                 placeholder="公告名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="info"
                  class="header-btn">查询
          </Button>
          <Button type="success"
                  @click="show = true">新增
          </Button>
        </FormItem>
      </Form>
    </headers>

    <Table :columns="columns1"
           :data="data1"
           border>
      <template slot-scope="{ row, index }" slot="index">
        <span>{{ (index + 1) + (pageData.page - 1) * pageData.limit }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="default" size="small" class="action-btn">编辑</Button>
        <Button type="error" size="small">删除</Button>
      </template>
    </Table>

    <Page v-if="data1.length > 0"
          :total="pageData.total"
          :current="pageData.page"
          :page-size="pageData.limit"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-sizer/>

    <div v-if="show"
         class="add-or-modify">
      <add-or-modify
        @closeModal="closeModal"></add-or-modify>
    </div>
  </div>
</template>

<script>
import Headers from '_c/hearders/Headers'
import AddOrModify from '@/view/main/announcement/component/AddOrModify'

export default {
  name: 'Announcement',
  components: { AddOrModify, Headers },
  data () {
    return {
      // 查询条件
      searchData: {
        user: ''
      },
      // 显示新增修改框
      show: false,
      // 分页信息
      pageData: {
        page: 1,
        limit: 10,
        total: 0
      },
      columns1: [
        {
          title: '序号',
          slot: 'index',
          width: 60
        },
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center',
          width: 130
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        }
      ]
    }
  },
  methods: {
    // 关闭弹窗
    closeModal (flag) {
      this.show = false
      flag && this.getData()
    },
    // 获取数据
    getData () {

    },
    changePage (page) {
      this.pageData.page = page
    },
    changePageSize (pageSize) {
      this.pageData.limit = pageSize
    }
  }
}
</script>

<style scoped>

</style>
