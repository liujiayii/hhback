<template>
  <div>
    <div class="top">
      <div></div>
      <a-button type="primary" shape="circle" icon="plus" @click="drawerShow=true">添加</a-button>
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
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-drawer
            title="运费"
            :width="400"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
            destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="价格区间">
          <a-input v-decorator="['prices']" style="width: 46%"/>
          ~
          <a-input v-decorator="['price']" style="width: 48%"/>
        </a-form-item>
        <a-form-item label="运费">
          <a-input v-decorator="['freight']"/>
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

  export default {
    name: "express",
    data() {
      return {
        columns: [
          {
            title: "价格区间(元)", dataIndex: "price",
            customRender: (text, record, index) => {
              return `${record.prices}元~${record.price}元`
            }
          },
          {title: "运费(元)", dataIndex: "freight"},
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
        form: this.$form.createForm(this)
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$ajax({
              url: 't_freight/addt_freight',
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
          ...filters,
        });
      },
      fetch(params = {}) {
        params.page = params.page || params.current || 1
        params.limit = params.limit || 10
        this.loading = true
        this.$ajax({
          url: "t_freight/selt_freight",
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
          url: "t_freight/delt_freight",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }
        })
      }
    },
    mounted() {
      this.fetch()
    }
  };
</script>

<style scoped>

</style>
