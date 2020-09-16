<template>
  <div>
    <headers>
      <Form :model="searchData"
            :label-width=50
            inline>
        <FormItem label="名称:">
          <Input type="text" v-model="searchData.user" placeholder="名称"></Input>
        </FormItem>
        <FormItem>
          <Button type="info" class="header-btn">查询</Button>
          <Button type="success">新增</Button>
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

    <Page v-if="data1.length > 1"
          :total="pageData.total"
          :current="pageData.page"
          :page-size="pageData.limit"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-sizer/>
  </div>
</template>

<script>
import Headers from '_c/hearders/Headers'

export default {
  name: '',
  components: { Headers },
  data () {
    return {
      // 查询条件
      searchData: {
        user: ''
      },
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
    changePage (page) {
      this.pageData.page = page
    },
    changePageSize (pageSize) {
      this.pageData.limit = pageSize
    },
    text (str = '[哭]') {
      let a = `<img src="hht:/// ">`
    }
  }
}
</script>

<style scoped>

</style>
