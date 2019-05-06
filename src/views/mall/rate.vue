<template>
  <div>
    <div class="top">
      <a-input-search placeholder="输入关键词搜索……" style="width: 300px" @search="onSearch"/>
    </div>
    <a-table :columns="columns"
             :rowKey="record => record.id"
             :dataSource="tableData"
             :pagination="pagination"
             :loading="loading"
             @change="handleTableChange"
             bordered
    >
      <template slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" @click="showDrawer(record)" style="margin-right: 6px">回复</a-button>
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small" disabled>删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
            title="商家回复"
            :width="720"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
            destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input v-decorator="['id']" type="hidden"/>
        </a-form-item>
        <a-form-item label="商家回复">
          <a-input v-decorator="['reply']" type="textarea"/>
        </a-form-item>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
  import {formatDate} from "../../config/utils";

  export default {
    name: "rate",
    data() {
      return {
        columns: [
          {title: "商品", dataIndex: "name"},
          {title: "评论内容", dataIndex: "review_content"},
          {
            title: "评论时间",
            dataIndex: "review_time",
            customRender: (text, record, index) => {
              return formatDate(new Date(text), "yyyy-MM-dd")
            }
          },
          {title: "商家回复", dataIndex: "reply"},
          {
            title: "回复时间",
            dataIndex: "reply_time",
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
        form: this.$form.createForm(this),
        searchKey: ''
      };
    },
    methods: {
      onSearch(value) {
        this.searchKey = value
        this.handleTableChange({current: 1})
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$ajax({
              url: 't_review/updateOnethin',
              data: values
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
                this.fetch(this.pagination)
                this.drawerShow = false;
              }
            })
          }
        });
      },
      showDrawer(row) {
        this.drawerShow = true;
        setTimeout(() => {
          this.form.setFieldsValue(row)
        }, 500)
      },
      handleTableChange(pagination, filters, sorter) {
        const pager = {...this.pagination};
        pager.current = pagination.current;
        this.pagination = pager;
        this.fetch({
          limit: pagination.pageSize,
          page: pagination.current,
          name: this.searchKey,
          ...filters,
        });
      },
      fetch(params = {}) {
        params.page = params.page || params.current || 1
        params.limit = params.limit || 10
        this.loading = true
        this.$ajax({
          url: "t_review/selectAllEvery",
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
        /*this.$ajax({
          url: "deleteInventoryById",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }
        })*/
      }
    },
    mounted() {
      this.fetch()
    }
  };
</script>

<style scoped>

</style>
