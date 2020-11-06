<template>
  <div class="header-con">
    <Form :model="queryFormData"
          :label-width="labelWidth"
          inline>
      <slot></slot>
      <FormItem v-if="hasTime"
                label="时间：">
        <DatePicker type="datetime"
                    placeholder="开始时间"
                    style="width: 160px"
                    clearable
                    :split-panels="true"
                    :options="disabledStartTime"
                    @on-change="changeStartTime"></DatePicker>
        <span style="color: #dddddd">一</span>
        <DatePicker type="datetime"
                    placeholder="结束时间"
                    style="width: 160px"
                    clearable
                    :split-panels="true"
                    :options="disabledEndTime"
                    @on-change="changeEndTime"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="info"
                class="header-btn"
                @click="queryData">查询
        </Button>
        <Button v-if="hasAdd"
                type="success"
                @click="add">新增
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'Headers',
  props: {
    searchData: {
      type: Object,
      default: () => {}
    },
    labelWidth: {
      type: Number,
      default: 80
    },
    hasTime: {
      type: Boolean,
      default: true
    },
    hasAdd: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      queryFormData: {
        startTime: null,
        endTime: null
      }
    }
  },
  computed: {
    disabledStartTime() {
      return {
        disabledDate: (time) => {
          if (this.queryFormData.endTime) {
            return time.getTime() > new Date(this.queryFormData.endTime.replace(/-/g, '/'))
          } else {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    disabledEndTime() {
      return {
        disabledDate: (time) => {
          if (this.queryFormData.startTime) {
            return time.getTime() < new Date(this.queryFormData.startTime.replace(/-/g, '/')) || time.getTime() > Date.now()
          } else {
            return time.getTime() > Date.now()
          }
        }
      }
    }
  },
  methods: {
    // 改变开始时间
    changeStartTime(date) {
      this.queryFormData.startTime = date || null
      this.queryData()
    },
    // 改变结束时间
    changeEndTime(date) {
      this.queryFormData.endTime = date || null
      this.queryData()
    },
    queryData() {
      let newData = {}
      Object.assign(newData, this.queryFormData, this.searchData)
      this.$emit('queryData', newData)
    },
    add() {
      this.$emit('addData')
    }
  }
}
</script>

<style scoped
       lang="less">
.header-con {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  border:1px #eeeeee solid;
  border-radius: 5px;
  margin-bottom: 10px;

  .ivu-form {
    display: flex;
    align-items: center;

    /deep/.ivu-form-item {
      margin-bottom: 0;
    }

    /deep/.ivu-btn {
      margin-right: 10px;
    }
  }
}
</style>
