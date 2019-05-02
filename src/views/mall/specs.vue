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
            title="规格"
            :width="720"
            @close="()=> drawerShow = false"
            :visible="drawerShow"
            wrapClassName="drawer-cont"
            destroyOnClose
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="规格分类">
          <a-select v-decorator="['producttypeid']" labelInValue>
            <a-select-option v-for="item in class_two" :value="item.id">{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="规格名称">
          <a-input v-decorator="['specificationsName']"/>
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
    name: "specs",
    data() {
      return {
        columns: [
          {title: "规格分类", dataIndex: "producttypename"},
          {title: "规格名称", dataIndex: "specificationsName"},
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
        class_two: []
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values.producttypeid)
            let cacheObj = values.producttypeid
            values.producttypeid = cacheObj.key
            values.producttypename = cacheObj.label
            this.$ajax({
              url: 'saveSpecificationsVo',
              data: values
            }).then(res => {
              if (res.data.code === 1) {
                this.$message.success(res.data.msg)
                this.fetch(this.pagination)
                this.drawerShow = false;
              } else {
                this.$message.error(res.data.msg)
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
        console.log(pagination);
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
          url: "listAllSpecifications",
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
          url: "deleteSpecificationsVoById",
          data: {specificationsId: row.specificationsId}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getClass_two() {
        this.$ajax({
          url: "selectAllProductTypeList",
          data: {
            page: 1, limit: 100
          }
        }).then((res) => {
          this.class_two = res.data.data
        });
      }
    },
    mounted() {
      this.getClass_two()
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
