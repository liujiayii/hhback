<template>
  <div>
    <div class="top">
      <div></div>
      <a-upload action="/t_carousel/insert" :showUploadList="false" @change="handleChange">
        <a-button type="primary" shape="circle" icon="upload">上传图片</a-button>
      </a-upload>
    </div>
    <a-table :columns="columns"
             :rowKey="record => record.id"
             :dataSource="tableData"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             bordered
    >
      <template slot="img" slot-scope="text, record">
        <img :src="text" alt="" height="100">
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>

<script>
  import {formatDate} from "../../../config/utils";

  export default {
    name: "sort_1",
    data() {
      return {
        columns: [
          {title: "编号", dataIndex: "id"},
          {title: "图片", dataIndex: "path", scopedSlots: {customRender: 'img'},},
          {
            title: "创建时间",
            dataIndex: "creat_time",
            customRender: (text, record, index) => {
              return formatDate(new Date(text), "yyyy-MM-dd")
            }
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: '160px',
            scopedSlots: {customRender: 'operation'},
          }
        ],
        tableData: [],
        pagination: {},
        loading: false,
        drawerShow: false,
      }
    },
    methods: {
      handleTableChange(pagination, filters, sorter) {
        const pager = {...this.pagination};
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          limit: pagination.pageSize,
          page: pagination.current,
          ...filters,
        });
      },
      fetch(params = {}) {
        params.page = params.page || params.current || 1
        params.limit = params.limit || 10
        this.loading = true
        this.$ajax({
          url: "t_carousel/selectAll",
          data: {
            ...params,
          }
        }).then((res) => {
          const pagination = {...this.pagination};
          pagination.total = res.data.count
          this.loading = false;
          this.tableData = res.data.data;
          this.pagination = pagination;
        });
      },
      remove(row) {
        this.$ajax({
          url: "t_carousel/deleatById",
          data: row
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      handleChange(info) {
        if (info.file.response.code === 1) {
          this.fetch()
        } else {
          this.$message.error(info.file.response.msg)
        }
      },
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
