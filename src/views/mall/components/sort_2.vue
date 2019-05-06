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
        <a-button type="primary" size="small" @click="showDrawer(record)" style="margin-right: 6px">查看</a-button>
        <a-popconfirm title="确定删除？" cancelText="取消" okText="确认" @confirm="remove(record)">
          <a-icon slot="icon" type="question-circle-o" style="color: red"/>
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </template>
      <template slot="img" slot-scope="text, record">
        <img :src="text" alt="" height="100">
      </template>
    </a-table>
    <a-drawer
      title="商品专区"
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
        <a-form-item label="专区名称">
          <a-input v-decorator="['name']"/>
        </a-form-item>
        <a-form-item label="专区图片">
          <a-input v-decorator="['image']" readOnly/>
        </a-form-item>
        <a-upload action="/upload" :showUploadList="false" @change="handleChange">
          <a-button type="primary" icon="upload">上传图片</a-button>
        </a-upload>
        <div class="drawer-footer">
          <a-button :style="{marginRight: '8px'}" @click="()=> drawerShow = false">取消</a-button>
          <a-button type="primary" html-type="submit">保存</a-button>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
  import {formatDate} from "../../../config/utils";

  export default {
    name: "sort_2",
    data() {
      return {
        columns: [
          {title: "编号", dataIndex: "id"},
          {title: "商品分类名称", dataIndex: "name"},
          {title: "图片", dataIndex: "image", scopedSlots: {customRender: 'img'},},
          {
            title: "创建时间",
            dataIndex: "create_time",
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
      }
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            if (values.id === undefined) {
              delete values.id
            }
            this.$ajax({
              url: values.id ? 'updateZone' : "saveZone",
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
          url: "selectZoneList",
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
          url: "deleteZoneById",
          data: {id: row.id}
        }).then(res => {
          if (res.data.code === 1) {
            this.$message.success(res.data.msg)
            this.fetch(this.pagination)
          }
        })
      },
      handleChange(info) {
        if (info['file']['response']['code'] === 1) {
          this.form.setFieldsValue({image: info.file.response.data})
        }
      }
    },
    mounted() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>
